/**
 * Codemirror extension wrappers.
 */
import { json } from '@codemirror/lang-json';
import { unifiedMergeView, updateOriginalDoc } from '@codemirror/merge';
import {
  ChangeSet,
  EditorState,
  type Extension,
  StateEffect,
  StateField,
  type Transaction,
} from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { noop } from 'lodash-es';

/** Options and initial values for a JSON editor's extensions. */
export interface ExtensionOptions {
  label: string;
  errorMessageID?: string | undefined;
  isInvalid?: boolean | undefined;
  readonly?: boolean;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  diffOriginal?: string | undefined;
}

/** Create an editor StateField and updater function. */
const createSource = <T>(): [
  source: StateField<T | undefined>,
  update: (view: EditorView | undefined, nextValue: T | undefined) => void,
] => {
  const updateEffect = StateEffect.define<T | undefined>();

  const source = StateField.define<T | undefined>({
    create: () => undefined,
    update: (prevValue, transaction) => {
      let nextValue = prevValue;

      for (const effect of transaction.effects) {
        if (effect.is(updateEffect)) {
          nextValue = effect.value;
        }
      }

      return nextValue;
    },
  });

  const update = (view: EditorView | undefined, nextValue: T | undefined) => {
    view?.dispatch({ effects: [updateEffect.of(nextValue)] });
  };

  return [source, update];
};

const [readonly, setReadOnly] = createSource<boolean>();
const [label, setLabel] = createSource<string>();
const [errorMessageID, setErrorMessageID] = createSource<string>();
const [isInvalid, setIsInvalid] = createSource<boolean>();

const setDiffOriginal = (
  view: EditorView | undefined,
  nextOriginal: string | undefined
) => {
  if (nextOriginal !== undefined) {
    view?.dispatch({
      effects: updateOriginalDoc.of({
        doc: view.state.toText(nextOriginal),
        changes: ChangeSet.empty(0),
      }),
    });
  }
};

/**
 * Create a CodeMirror extension list for a JSON editor.
 *
 * Adds various state fields and effects so that props changes
 * can be hooked to the editor without needing to completely
 * reconfigure or recreate the extensions list.
 *
 * @param options Initial values for editor state
 * @returns The extension list and hooks to reactively update the state
 *
 */

export const createJsonExtensions = (
  options: ExtensionOptions
): readonly Extension[] => {
  const extensions = [
    readonly.init(() => options.readonly),
    label.init(() => options.label),
    errorMessageID.init(() => options.errorMessageID),
    isInvalid.init(() => options.isInvalid),
    basicSetup,
    json(),
    EditorView.contentAttributes.compute(
      [label, errorMessageID, isInvalid],
      (state) => {
        const computedAttributes: Record<string, string> = {};
        const labelValue = state.field(label);
        if (labelValue !== undefined) {
          computedAttributes['aria-label'] = labelValue;
        }
        if (state.field(isInvalid) === true) {
          computedAttributes['aria-invalid'] = 'true';
        }
        const errorMessageIDValue = state.field(errorMessageID);
        if (errorMessageIDValue !== undefined) {
          computedAttributes['aria-errormessage'] = errorMessageIDValue;
        }
        return computedAttributes;
      }
    ),
    EditorView.editable.from(readonly, (readonlyValue) => !readonlyValue),
    EditorState.readOnly.from(readonly),
    EditorView.domEventObservers({
      blur: options.onBlur ?? noop,
      focus: options.onFocus ?? noop,
    }),
  ];

  if (options.diffOriginal !== undefined) {
    extensions.push(
      unifiedMergeView({
        original: options.diffOriginal,
        mergeControls: false,
      })
    );
  }

  return extensions;
};

/**
 * Dispatch change events when the contents of the editor change.
 *
 * Create a new dispatch function whenever the editor is re-created
 */
export const createDispatchTransactions = (
  onChange: (nextValue: string) => unknown
) => {
  let currentValue: string | undefined;

  return (transactions: readonly Transaction[], view: EditorView) => {
    view.update(transactions);

    let nextValue = view.state.doc.toString();

    if (nextValue === '') {
      nextValue = '{}';
    }

    if (currentValue === undefined) {
      currentValue = nextValue;
    }

    if (nextValue !== currentValue) {
      currentValue = nextValue;
      onChange(currentValue);
    }
  };
};

export {
  setDiffOriginal,
  setErrorMessageID,
  setIsInvalid,
  setLabel,
  setReadOnly,
};
