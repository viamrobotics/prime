import { get, writable } from 'svelte/store';

const ensureOptionIsVisible = (
  menu: HTMLUListElement,
  option: HTMLLIElement
) => {
  const { top, bottom } = option.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();

  if (bottom < menuRect.bottom && top > menuRect.top) {
    option.scrollIntoView({ block: 'nearest' });
  }

  (option.children[0] as HTMLButtonElement | HTMLInputElement).focus();
};

export const selectControls = () => {
  const isOpen = writable(false);

  const isKeyboardControlling = writable(false);

  const navigationIndex = writable(-1);
  const resetNavigationIndex = () => navigationIndex.set(-1);

  const open = () => isOpen.set(true);
  const close = () => {
    isOpen.set(false);
    resetNavigationIndex();
  };

  const navigate = (direction: 1 | -1, optionsCount: number) => {
    const next = get(navigationIndex) + direction;

    if (next < 0) {
      navigationIndex.set(optionsCount - 1);
      return;
    }

    if (next >= optionsCount) {
      navigationIndex.set(0);
      return;
    }

    navigationIndex.set(next);
  };

  const scrollToOption = (menu: HTMLUListElement) => {
    const option = menu.children[get(navigationIndex)]! as HTMLLIElement;
    ensureOptionIsVisible(menu, option);
  };

  const handleNavigation = (
    event: KeyboardEvent,
    menu: HTMLUListElement,
    optionsCount: number
  ) => {
    isKeyboardControlling.set(true);

    switch (event.code.toLowerCase()) {
      case 'arrowup': {
        event.preventDefault();
        navigate(-1, optionsCount);
        scrollToOption(menu);
        return true;
      }
      case 'arrowdown': {
        event.preventDefault();
        navigate(1, optionsCount);
        scrollToOption(menu);
        return true;
      }
      case 'escape':
      case 'tab': {
        close();
        return true;
      }
      default: {
        return false;
      }
    }
  };

  const handleFocus = (disabled: boolean) => {
    if (get(isOpen) || disabled) {
      return;
    }

    open();
  };

  const handleOptionFocus = (index: number) => {
    if (!get(isKeyboardControlling)) {
      navigationIndex.set(index);
    }
  };

  return {
    isOpen,
    isKeyboardControlling,
    navigationIndex,
    open,
    close,
    resetNavigationIndex,
    handleNavigation,
    handleFocus,
    handleOptionFocus,
  };
};
