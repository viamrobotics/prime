var prime = '';

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function not_equal(a, b) {
    return a != a ? b == b : a !== b;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}
function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_custom_element_data(node, prop, value) {
    if (prop in node) {
        node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
    }
    else {
        attr(node, prop, value);
    }
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_style(node, key, value, important) {
    if (value === null) {
        node.style.removeProperty(key);
    }
    else {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function attribute_to_object(attributes) {
    const result = {};
    for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
    }
    return result;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        while (flushidx < dirty_components.length) {
            const component = dirty_components[flushidx];
            flushidx++;
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}

function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === 'function') {
    SvelteElement = class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            const { on_mount } = this.$$;
            this.$$.on_disconnect = on_mount.map(run).filter(is_function);
            // @ts-ignore todo: improve typings
            for (const key in this.$$.slotted) {
                // @ts-ignore todo: improve typings
                this.appendChild(this.$$.slotted[key]);
            }
        }
        attributeChangedCallback(attr, _oldValue, newValue) {
            this[attr] = newValue;
        }
        disconnectedCallback() {
            run_all(this.$$.on_disconnect);
        }
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            // TODO should this delegate to addEventListener?
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    };
}

var classnames = {exports: {}};

/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function (module) {
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
}(classnames));

var cx = classnames.exports;

const { base = "", query = "" } = window.PRIME_CONFIG ?? {};
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = `${base ?? ""}/prime.css${query}`;
const addStyles = () => {
  const element = get_current_component();
  onMount(() => {
    element.style.display = "none";
    const clone = link.cloneNode();
    clone.addEventListener("load", () => {
      element.style.removeProperty("display");
    });
    element.shadowRoot.prepend(clone);
  });
};

const dispatch = (element, name, detail) => {
  return element.dispatchEvent(new CustomEvent(name, {
    composed: true,
    bubbles: true,
    detail
  }));
};

/* src/elements/badge/index.svelte generated by Svelte v3.49.0 */

function create_fragment$9(ctx) {
	let small;
	let t;
	let small_class_value;

	return {
		c() {
			small = element("small");
			t = text(/*label*/ ctx[0]);
			this.c = noop;

			attr(small, "class", small_class_value = cx('rounded-full px-3 py-0.5 text-xs', {
				'text-green-900 bg-green-200': /*variant*/ ctx[1] === 'green',
				'text-orange-900 bg-orange-200': /*variant*/ ctx[1] === 'orange',
				'text-red-900 bg-red-200': /*variant*/ ctx[1] === 'red',
				'text-gray-800 bg-gray-200': /*variant*/ ctx[1] === 'gray'
			}));
		},
		m(target, anchor) {
			insert(target, small, anchor);
			append(small, t);
		},
		p(ctx, [dirty]) {
			if (dirty & /*label*/ 1) set_data(t, /*label*/ ctx[0]);

			if (dirty & /*variant*/ 2 && small_class_value !== (small_class_value = cx('rounded-full px-3 py-0.5 text-xs', {
				'text-green-900 bg-green-200': /*variant*/ ctx[1] === 'green',
				'text-orange-900 bg-orange-200': /*variant*/ ctx[1] === 'orange',
				'text-red-900 bg-red-200': /*variant*/ ctx[1] === 'red',
				'text-gray-800 bg-gray-200': /*variant*/ ctx[1] === 'gray'
			}))) {
				attr(small, "class", small_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(small);
		}
	};
}

function instance$9($$self, $$props, $$invalidate) {
	let { label = '' } = $$props;
	let { variant = 'gray' } = $$props;
	addStyles();

	$$self.$$set = $$props => {
		if ('label' in $$props) $$invalidate(0, label = $$props.label);
		if ('variant' in $$props) $$invalidate(1, variant = $$props.variant);
	};

	return [label, variant];
}

class Badge extends SvelteElement {
	constructor(options) {
		super();

		init(
			this,
			{
				target: this.shadowRoot,
				props: attribute_to_object(this.attributes),
				customElement: true
			},
			instance$9,
			create_fragment$9,
			not_equal,
			{ label: 0, variant: 1 },
			null
		);

		if (options) {
			if (options.target) {
				insert(options.target, this, options.anchor);
			}

			if (options.props) {
				this.$set(options.props);
				flush();
			}
		}
	}

	static get observedAttributes() {
		return ["label", "variant"];
	}

	get label() {
		return this.$$.ctx[0];
	}

	set label(label) {
		this.$$set({ label });
		flush();
	}

	get variant() {
		return this.$$.ctx[1];
	}

	set variant(variant) {
		this.$$set({ variant });
		flush();
	}
}

customElements.define("v-badge", Badge);

/* src/elements/breadcrumbs/index.svelte generated by Svelte v3.49.0 */

function get_each_context$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	child_ctx[4] = i;
	return child_ctx;
}

// (15:4) {#if index !== parsedCrumbs.length - 1}
function create_if_block$5(ctx) {
	let div2;

	return {
		c() {
			div2 = element("div");

			div2.innerHTML = `<div class="w-px h-[60%] border-l border-black -rotate-[30deg] -mt-px"></div> 
        <div class="w-px h-[60%] border-l border-black rotate-[30deg] -mt-0.5"></div> 
      `;
		},
		m(target, anchor) {
			insert(target, div2, anchor);
		},
		d(detaching) {
			if (detaching) detach(div2);
		}
	};
}

// (11:2) {#each parsedCrumbs as crumb, index (crumb)}
function create_each_block$4(key_1, ctx) {
	let small;
	let t0_value = /*crumb*/ ctx[2] + "";
	let t0;
	let t1;
	let if_block_anchor;
	let if_block = /*index*/ ctx[4] !== /*parsedCrumbs*/ ctx[0].length - 1 && create_if_block$5();

	return {
		key: key_1,
		first: null,
		c() {
			small = element("small");
			t0 = text(t0_value);
			t1 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			attr(small, "class", "py1");
			this.first = small;
		},
		m(target, anchor) {
			insert(target, small, anchor);
			append(small, t0);
			insert(target, t1, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*parsedCrumbs*/ 1 && t0_value !== (t0_value = /*crumb*/ ctx[2] + "")) set_data(t0, t0_value);

			if (/*index*/ ctx[4] !== /*parsedCrumbs*/ ctx[0].length - 1) {
				if (if_block) ; else {
					if_block = create_if_block$5();
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) detach(small);
			if (detaching) detach(t1);
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment$8(ctx) {
	let div;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_value = /*parsedCrumbs*/ ctx[0];
	const get_key = ctx => /*crumb*/ ctx[2];

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$4(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$4(key, child_ctx));
	}

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.c = noop;
			attr(div, "class", "inline-flex gap-3 px-4 border border-black rounded-full");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*parsedCrumbs*/ 1) {
				each_value = /*parsedCrumbs*/ ctx[0];
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, destroy_block, create_each_block$4, null, get_each_context$4);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};
}

function instance$8($$self, $$props, $$invalidate) {
	let { crumbs = '' } = $$props;
	addStyles();
	let parsedCrumbs;

	$$self.$$set = $$props => {
		if ('crumbs' in $$props) $$invalidate(1, crumbs = $$props.crumbs);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*crumbs*/ 2) {
			$$invalidate(0, parsedCrumbs = crumbs.split(',').map(str => str.trim()));
		}
	};

	return [parsedCrumbs, crumbs];
}

class Breadcrumbs extends SvelteElement {
	constructor(options) {
		super();

		init(
			this,
			{
				target: this.shadowRoot,
				props: attribute_to_object(this.attributes),
				customElement: true
			},
			instance$8,
			create_fragment$8,
			not_equal,
			{ crumbs: 1 },
			null
		);

		if (options) {
			if (options.target) {
				insert(options.target, this, options.anchor);
			}

			if (options.props) {
				this.$set(options.props);
				flush();
			}
		}
	}

	static get observedAttributes() {
		return ["crumbs"];
	}

	get crumbs() {
		return this.$$.ctx[1];
	}

	set crumbs(crumbs) {
		this.$$set({ crumbs });
		flush();
	}
}

customElements.define("v-breadcrumbs", Breadcrumbs);

/* src/elements/button/index.svelte generated by Svelte v3.49.0 */

function create_fragment$7(ctx) {
	let button;
	let t;
	let button_class_value;

	return {
		c() {
			button = element("button");
			t = text(/*label*/ ctx[1]);
			this.c = noop;
			attr(button, "type", "button");

			attr(button, "class", button_class_value = cx('py-1.5 px-2 text-xs border', {
				'border-black': /*variant*/ ctx[0] === 'primary',
				'bg-red/90 text-white border-red/90': /*variant*/ ctx[0] === 'danger',
				'border-red/90 text-red/90': /*variant*/ ctx[0] === 'outline-danger'
			}));
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, t);
		},
		p(ctx, [dirty]) {
			if (dirty & /*label*/ 2) set_data(t, /*label*/ ctx[1]);

			if (dirty & /*variant*/ 1 && button_class_value !== (button_class_value = cx('py-1.5 px-2 text-xs border', {
				'border-black': /*variant*/ ctx[0] === 'primary',
				'bg-red/90 text-white border-red/90': /*variant*/ ctx[0] === 'danger',
				'border-red/90 text-red/90': /*variant*/ ctx[0] === 'outline-danger'
			}))) {
				attr(button, "class", button_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(button);
		}
	};
}

function instance$7($$self, $$props, $$invalidate) {
	let { variant = 'primary' } = $$props;
	let { label = '' } = $$props;
	addStyles();

	$$self.$$set = $$props => {
		if ('variant' in $$props) $$invalidate(0, variant = $$props.variant);
		if ('label' in $$props) $$invalidate(1, label = $$props.label);
	};

	return [variant, label];
}

class Button extends SvelteElement {
	constructor(options) {
		super();

		init(
			this,
			{
				target: this.shadowRoot,
				props: attribute_to_object(this.attributes),
				customElement: true
			},
			instance$7,
			create_fragment$7,
			not_equal,
			{ variant: 0, label: 1 },
			null
		);

		if (options) {
			if (options.target) {
				insert(options.target, this, options.anchor);
			}

			if (options.props) {
				this.$set(options.props);
				flush();
			}
		}
	}

	static get observedAttributes() {
		return ["variant", "label"];
	}

	get variant() {
		return this.$$.ctx[0];
	}

	set variant(variant) {
		this.$$set({ variant });
		flush();
	}

	get label() {
		return this.$$.ctx[1];
	}

	set label(label) {
		this.$$set({ label });
		flush();
	}
}

customElements.define("v-button", Button);

/* src/elements/collapse/index.svelte generated by Svelte v3.49.0 */

function create_if_block$4(ctx) {
	let h2;
	let t;

	return {
		c() {
			h2 = element("h2");
			t = text(/*title*/ ctx[1]);
			attr(h2, "class", "text-sm");
		},
		m(target, anchor) {
			insert(target, h2, anchor);
			append(h2, t);
		},
		p(ctx, dirty) {
			if (dirty & /*title*/ 2) set_data(t, /*title*/ ctx[1]);
		},
		d(detaching) {
			if (detaching) detach(h2);
		}
	};
}

function create_fragment$6(ctx) {
	let div4;
	let div2;
	let div0;
	let t0;
	let slot0;
	let t1;
	let div1;
	let slot1;
	let t2;
	let svg;
	let polyline;
	let svg_class_value;
	let t3;
	let div3;
	let slot2;
	let div3_class_value;
	let mounted;
	let dispose;
	let if_block = /*title*/ ctx[1] && create_if_block$4(ctx);

	return {
		c() {
			div4 = element("div");
			div2 = element("div");
			div0 = element("div");
			if (if_block) if_block.c();
			t0 = space();
			slot0 = element("slot");
			t1 = space();
			div1 = element("div");
			slot1 = element("slot");
			t2 = space();
			svg = svg_element("svg");
			polyline = svg_element("polyline");
			t3 = space();
			div3 = element("div");
			slot2 = element("slot");
			this.c = noop;
			attr(slot0, "name", "title");
			attr(div0, "class", "flex items-center gap-2");
			attr(slot1, "name", "header");
			attr(polyline, "points", "6 9 12 15 18 9");

			attr(svg, "class", svg_class_value = cx('transition-transform duration-200', {
				'rotate-0': !/*open*/ ctx[0],
				'rotate-180': /*open*/ ctx[0]
			}));

			attr(svg, "width", "24");
			attr(svg, "height", "24");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "stroke", "currentColor");
			attr(svg, "stroke-linejoin", "round");
			attr(svg, "stroke-linecap", "round");
			attr(svg, "fill", "none");
			attr(div1, "class", "h-full flex items-center gap-3");
			attr(div2, "class", "w-full py-1.5 px-4 flex items-center justify-between border text-black border-black bg-white cursor-pointer");

			attr(div3, "class", div3_class_value = cx('bg-white text-black overflow-hidden transition-all duration-500', {
				'max-h-0': !/*open*/ ctx[0],
				'max-h-fit': /*open*/ ctx[0]
			}));

			attr(div4, "class", "relative w-full overflow-hidden");
		},
		m(target, anchor) {
			insert(target, div4, anchor);
			append(div4, div2);
			append(div2, div0);
			if (if_block) if_block.m(div0, null);
			append(div0, t0);
			append(div0, slot0);
			append(div2, t1);
			append(div2, div1);
			append(div1, slot1);
			append(div1, t2);
			append(div1, svg);
			append(svg, polyline);
			append(div4, t3);
			append(div4, div3);
			append(div3, slot2);
			/*div4_binding*/ ctx[4](div4);

			if (!mounted) {
				dispose = listen(div2, "click", /*handleClick*/ ctx[3]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*title*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$4(ctx);
					if_block.c();
					if_block.m(div0, t0);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*open*/ 1 && svg_class_value !== (svg_class_value = cx('transition-transform duration-200', {
				'rotate-0': !/*open*/ ctx[0],
				'rotate-180': /*open*/ ctx[0]
			}))) {
				attr(svg, "class", svg_class_value);
			}

			if (dirty & /*open*/ 1 && div3_class_value !== (div3_class_value = cx('bg-white text-black overflow-hidden transition-all duration-500', {
				'max-h-0': !/*open*/ ctx[0],
				'max-h-fit': /*open*/ ctx[0]
			}))) {
				attr(div3, "class", div3_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div4);
			if (if_block) if_block.d();
			/*div4_binding*/ ctx[4](null);
			mounted = false;
			dispose();
		}
	};
}

function instance$6($$self, $$props, $$invalidate) {
	let { title = '' } = $$props;
	let { open = false } = $$props;
	let root;
	addStyles();

	const handleClick = () => {
		$$invalidate(0, open = !open);
		dispatch(root, 'toggle', { open });
	};

	function div4_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			root = $$value;
			$$invalidate(2, root);
		});
	}

	$$self.$$set = $$props => {
		if ('title' in $$props) $$invalidate(1, title = $$props.title);
		if ('open' in $$props) $$invalidate(0, open = $$props.open);
	};

	return [open, title, root, handleClick, div4_binding];
}

class Collapse extends SvelteElement {
	constructor(options) {
		super();

		init(
			this,
			{
				target: this.shadowRoot,
				props: attribute_to_object(this.attributes),
				customElement: true
			},
			instance$6,
			create_fragment$6,
			not_equal,
			{ title: 1, open: 0 },
			null
		);

		if (options) {
			if (options.target) {
				insert(options.target, this, options.anchor);
			}

			if (options.props) {
				this.$set(options.props);
				flush();
			}
		}
	}

	static get observedAttributes() {
		return ["title", "open"];
	}

	get title() {
		return this.$$.ctx[1];
	}

	set title(title) {
		this.$$set({ title });
		flush();
	}

	get open() {
		return this.$$.ctx[0];
	}

	set open(open) {
		this.$$set({ open });
		flush();
	}
}

customElements.define("v-collapse", Collapse);

/* src/elements/input/index.svelte generated by Svelte v3.49.0 */

function create_if_block_1$1(ctx) {
	let p;
	let t;
	let p_class_value;

	return {
		c() {
			p = element("p");
			t = text(/*label*/ ctx[3]);

			attr(p, "class", p_class_value = cx('text-xs', {
				'pb-1': /*labelposition*/ ctx[4] === 'top',
				inline: /*labelposition*/ ctx[4] === 'left'
			}));
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t);
		},
		p(ctx, dirty) {
			if (dirty & /*label*/ 8) set_data(t, /*label*/ ctx[3]);

			if (dirty & /*labelposition*/ 16 && p_class_value !== (p_class_value = cx('text-xs', {
				'pb-1': /*labelposition*/ ctx[4] === 'top',
				inline: /*labelposition*/ ctx[4] === 'left'
			}))) {
				attr(p, "class", p_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (51:2) {#if type === 'number'}
function create_if_block$3(ctx) {
	let div;
	let svg0;
	let path0;
	let t;
	let svg1;
	let path1;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			svg0 = svg_element("svg");
			path0 = svg_element("path");
			t = space();
			svg1 = svg_element("svg");
			path1 = svg_element("path");
			attr(path0, "d", "M9.29 13l0.71 0.71 5.66-5.66-1.41-1.41-4.24 4.24-4.24-4.24-1.41 1.41z");
			attr(svg0, "class", "h-[15px] rotate-180");
			attr(svg0, "viewBox", "0 0 20 20");
			attr(path1, "d", "M9.29 13l0.71 0.71 5.66-5.66-1.41-1.41-4.24 4.24-4.24-4.24-1.41 1.41z");
			attr(svg1, "class", "h-[15px]");
			attr(svg1, "viewBox", "0 0 20 20");
			attr(div, "class", "absolute right-0 bottom-0 cursor-pointer select-none");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, svg0);
			append(svg0, path0);
			append(div, t);
			append(div, svg1);
			append(svg1, path1);

			if (!mounted) {
				dispose = [
					listen(svg0, "click", /*click_handler*/ ctx[11]),
					listen(svg1, "click", /*click_handler_1*/ ctx[12])
				];

				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$5(ctx) {
	let label_1;
	let t0;
	let input_1;
	let t1;
	let mounted;
	let dispose;
	let if_block0 = /*label*/ ctx[3] && create_if_block_1$1(ctx);
	let if_block1 = /*type*/ ctx[1] === 'number' && create_if_block$3(ctx);

	return {
		c() {
			label_1 = element("label");
			if (if_block0) if_block0.c();
			t0 = space();
			input_1 = element("input");
			t1 = space();
			if (if_block1) if_block1.c();
			this.c = noop;
			attr(input_1, "class", "py-1.5 px-2.5 border text-xs border-black bg-white outline-none");
			attr(input_1, "type", /*type*/ ctx[1]);
			attr(input_1, "placeholder", /*placeholder*/ ctx[2]);
			input_1.value = /*value*/ ctx[0];
			attr(label_1, "class", "relative flex flex-col max-w-[14rem]");
		},
		m(target, anchor) {
			insert(target, label_1, anchor);
			if (if_block0) if_block0.m(label_1, null);
			append(label_1, t0);
			append(label_1, input_1);
			/*input_1_binding*/ ctx[10](input_1);
			append(label_1, t1);
			if (if_block1) if_block1.m(label_1, null);
			/*label_1_binding*/ ctx[13](label_1);

			if (!mounted) {
				dispose = listen(input_1, "input", /*handleInput*/ ctx[7]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*label*/ ctx[3]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_1$1(ctx);
					if_block0.c();
					if_block0.m(label_1, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty & /*type*/ 2) {
				attr(input_1, "type", /*type*/ ctx[1]);
			}

			if (dirty & /*placeholder*/ 4) {
				attr(input_1, "placeholder", /*placeholder*/ ctx[2]);
			}

			if (dirty & /*value*/ 1 && input_1.value !== /*value*/ ctx[0]) {
				input_1.value = /*value*/ ctx[0];
			}

			if (/*type*/ ctx[1] === 'number') {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block$3(ctx);
					if_block1.c();
					if_block1.m(label_1, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(label_1);
			if (if_block0) if_block0.d();
			/*input_1_binding*/ ctx[10](null);
			if (if_block1) if_block1.d();
			/*label_1_binding*/ ctx[13](null);
			mounted = false;
			dispose();
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	let { type = 'text' } = $$props;
	let { placeholder = '' } = $$props;
	let { label = '' } = $$props;
	let { value = '' } = $$props;
	let { step = '1' } = $$props;
	let { labelposition = 'top' } = $$props;
	let root;
	let input;
	let stepNumber;
	addStyles();

	const handleInput = event => {
		event.preventDefault();
		event.stopImmediatePropagation();
		$$invalidate(0, value = input.value);
		dispatch(root, 'input', { value });
	};

	const increment = direction => {
		const numberValue = Number.parseFloat(value || '0');
		$$invalidate(0, value = $$invalidate(6, input.value = String(numberValue + stepNumber * direction), input));
		dispatch(root, 'input', { value });
	};

	function input_1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			input = $$value;
			$$invalidate(6, input);
		});
	}

	const click_handler = () => increment(1);
	const click_handler_1 = () => increment(-1);

	function label_1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			root = $$value;
			$$invalidate(5, root);
		});
	}

	$$self.$$set = $$props => {
		if ('type' in $$props) $$invalidate(1, type = $$props.type);
		if ('placeholder' in $$props) $$invalidate(2, placeholder = $$props.placeholder);
		if ('label' in $$props) $$invalidate(3, label = $$props.label);
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('step' in $$props) $$invalidate(9, step = $$props.step);
		if ('labelposition' in $$props) $$invalidate(4, labelposition = $$props.labelposition);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*step*/ 512) {
			stepNumber = Number.parseFloat(step);
		}
	};

	return [
		value,
		type,
		placeholder,
		label,
		labelposition,
		root,
		input,
		handleInput,
		increment,
		step,
		input_1_binding,
		click_handler,
		click_handler_1,
		label_1_binding
	];
}

class Input extends SvelteElement {
	constructor(options) {
		super();
		this.shadowRoot.innerHTML = `<style>input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{appearance:none}</style>`;

		init(
			this,
			{
				target: this.shadowRoot,
				props: attribute_to_object(this.attributes),
				customElement: true
			},
			instance$5,
			create_fragment$5,
			not_equal,
			{
				type: 1,
				placeholder: 2,
				label: 3,
				value: 0,
				step: 9,
				labelposition: 4
			},
			null
		);

		if (options) {
			if (options.target) {
				insert(options.target, this, options.anchor);
			}

			if (options.props) {
				this.$set(options.props);
				flush();
			}
		}
	}

	static get observedAttributes() {
		return ["type", "placeholder", "label", "value", "step", "labelposition"];
	}

	get type() {
		return this.$$.ctx[1];
	}

	set type(type) {
		this.$$set({ type });
		flush();
	}

	get placeholder() {
		return this.$$.ctx[2];
	}

	set placeholder(placeholder) {
		this.$$set({ placeholder });
		flush();
	}

	get label() {
		return this.$$.ctx[3];
	}

	set label(label) {
		this.$$set({ label });
		flush();
	}

	get value() {
		return this.$$.ctx[0];
	}

	set value(value) {
		this.$$set({ value });
		flush();
	}

	get step() {
		return this.$$.ctx[9];
	}

	set step(step) {
		this.$$set({ step });
		flush();
	}

	get labelposition() {
		return this.$$.ctx[4];
	}

	set labelposition(labelposition) {
		this.$$set({ labelposition });
		flush();
	}
}

customElements.define("v-input", Input);

/* src/elements/radio/index.svelte generated by Svelte v3.49.0 */

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[9] = list[i];
	return child_ctx;
}

// (21:2) {#if label}
function create_if_block$2(ctx) {
	let p;
	let t;
	let p_class_value;

	return {
		c() {
			p = element("p");
			t = text(/*label*/ ctx[1]);

			attr(p, "class", p_class_value = cx('text-xs', {
				'pb-1': /*labelposition*/ ctx[2] === 'top',
				inline: /*labelposition*/ ctx[2] === 'left'
			}));
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t);
		},
		p(ctx, dirty) {
			if (dirty & /*label*/ 2) set_data(t, /*label*/ ctx[1]);

			if (dirty & /*labelposition*/ 4 && p_class_value !== (p_class_value = cx('text-xs', {
				'pb-1': /*labelposition*/ ctx[2] === 'top',
				inline: /*labelposition*/ ctx[2] === 'left'
			}))) {
				attr(p, "class", p_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (30:2) {#each parsedOptions as option}
function create_each_block$3(ctx) {
	let button_1;
	let t0_value = /*option*/ ctx[9] + "";
	let t0;
	let t1;
	let button_1_class_value;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[8](/*option*/ ctx[9]);
	}

	return {
		c() {
			button_1 = element("button");
			t0 = text(t0_value);
			t1 = space();

			attr(button_1, "class", button_1_class_value = cx('border-y border-l last:border-r border-black px-2 py-1 text-sm', {
				'bg-white': /*option*/ ctx[9] !== /*selected*/ ctx[0],
				'bg-black text-white': /*option*/ ctx[9] === /*selected*/ ctx[0]
			}));
		},
		m(target, anchor) {
			insert(target, button_1, anchor);
			append(button_1, t0);
			append(button_1, t1);
			/*button_1_binding*/ ctx[7](button_1);

			if (!mounted) {
				dispose = listen(button_1, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*parsedOptions*/ 16 && t0_value !== (t0_value = /*option*/ ctx[9] + "")) set_data(t0, t0_value);

			if (dirty & /*parsedOptions, selected*/ 17 && button_1_class_value !== (button_1_class_value = cx('border-y border-l last:border-r border-black px-2 py-1 text-sm', {
				'bg-white': /*option*/ ctx[9] !== /*selected*/ ctx[0],
				'bg-black text-white': /*option*/ ctx[9] === /*selected*/ ctx[0]
			}))) {
				attr(button_1, "class", button_1_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(button_1);
			/*button_1_binding*/ ctx[7](null);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$4(ctx) {
	let label_1;
	let t;
	let if_block = /*label*/ ctx[1] && create_if_block$2(ctx);
	let each_value = /*parsedOptions*/ ctx[4];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	}

	return {
		c() {
			label_1 = element("label");
			if (if_block) if_block.c();
			t = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.c = noop;
		},
		m(target, anchor) {
			insert(target, label_1, anchor);
			if (if_block) if_block.m(label_1, null);
			append(label_1, t);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(label_1, null);
			}
		},
		p(ctx, [dirty]) {
			if (/*label*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					if_block.m(label_1, t);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*cx, parsedOptions, selected, button, handleClick*/ 57) {
				each_value = /*parsedOptions*/ ctx[4];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(label_1, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(label_1);
			if (if_block) if_block.d();
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	let { label = '' } = $$props;
	let { options = '' } = $$props;
	let { selected = '' } = $$props;
	let { labelposition = 'top' } = $$props;
	addStyles();
	let button;
	let parsedOptions;

	const handleClick = value => {
		$$invalidate(0, selected = value);
		dispatch(button, 'input', { value });
	};

	function button_1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			button = $$value;
			$$invalidate(3, button);
		});
	}

	const click_handler = option => handleClick(option);

	$$self.$$set = $$props => {
		if ('label' in $$props) $$invalidate(1, label = $$props.label);
		if ('options' in $$props) $$invalidate(6, options = $$props.options);
		if ('selected' in $$props) $$invalidate(0, selected = $$props.selected);
		if ('labelposition' in $$props) $$invalidate(2, labelposition = $$props.labelposition);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*options*/ 64) {
			$$invalidate(4, parsedOptions = options.split(',').map(str => str.trim()));
		}
	};

	return [
		selected,
		label,
		labelposition,
		button,
		parsedOptions,
		handleClick,
		options,
		button_1_binding,
		click_handler
	];
}

class Radio extends SvelteElement {
	constructor(options) {
		super();

		init(
			this,
			{
				target: this.shadowRoot,
				props: attribute_to_object(this.attributes),
				customElement: true
			},
			instance$4,
			create_fragment$4,
			not_equal,
			{
				label: 1,
				options: 6,
				selected: 0,
				labelposition: 2
			},
			null
		);

		if (options) {
			if (options.target) {
				insert(options.target, this, options.anchor);
			}

			if (options.props) {
				this.$set(options.props);
				flush();
			}
		}
	}

	static get observedAttributes() {
		return ["label", "options", "selected", "labelposition"];
	}

	get label() {
		return this.$$.ctx[1];
	}

	set label(label) {
		this.$$set({ label });
		flush();
	}

	get options() {
		return this.$$.ctx[6];
	}

	set options(options) {
		this.$$set({ options });
		flush();
	}

	get selected() {
		return this.$$.ctx[0];
	}

	set selected(selected) {
		this.$$set({ selected });
		flush();
	}

	get labelposition() {
		return this.$$.ctx[2];
	}

	set labelposition(labelposition) {
		this.$$set({ labelposition });
		flush();
	}
}

customElements.define("v-radio", Radio);

/* src/elements/select/index.svelte generated by Svelte v3.49.0 */

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i];
	return child_ctx;
}

// (26:4) {#each parsedOptions as option (option)}
function create_each_block$2(key_1, ctx) {
	let div;
	let t0_value = /*option*/ ctx[11] + "";
	let t0;
	let t1;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[9](/*option*/ ctx[11]);
	}

	return {
		key: key_1,
		first: null,
		c() {
			div = element("div");
			t0 = text(t0_value);
			t1 = space();
			attr(div, "class", "cursor-pointer px-2 hover:bg-gray-100");
			this.first = div;
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t0);
			append(div, t1);

			if (!mounted) {
				dispose = listen(div, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*parsedOptions*/ 2 && t0_value !== (t0_value = /*option*/ ctx[11] + "")) set_data(t0, t0_value);
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$3(ctx) {
	let v_collapse;
	let div;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let mounted;
	let dispose;
	let each_value = /*parsedOptions*/ ctx[1];
	const get_key = ctx => /*option*/ ctx[11];

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$2(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
	}

	return {
		c() {
			v_collapse = element("v-collapse");
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.c = noop;
			attr(div, "class", "flex flex-col gap-2 p-2");
			set_custom_element_data(v_collapse, "title", /*selectedOption*/ ctx[3]);
			set_custom_element_data(v_collapse, "open", /*open*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, v_collapse, anchor);
			append(v_collapse, div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			/*v_collapse_binding*/ ctx[10](v_collapse);

			if (!mounted) {
				dispose = listen(v_collapse, "toggle", /*handleToggle*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*handleClick, parsedOptions*/ 18) {
				each_value = /*parsedOptions*/ ctx[1];
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, destroy_block, create_each_block$2, null, get_each_context$2);
			}

			if (dirty & /*selectedOption*/ 8) {
				set_custom_element_data(v_collapse, "title", /*selectedOption*/ ctx[3]);
			}

			if (dirty & /*open*/ 1) {
				set_custom_element_data(v_collapse, "open", /*open*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(v_collapse);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			/*v_collapse_binding*/ ctx[10](null);
			mounted = false;
			dispose();
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	let { options = '' } = $$props;
	let { selected = '' } = $$props;
	let { open = false } = $$props;
	let { placeholder = '' } = $$props;
	let root;
	let parsedOptions;
	let selectedOption;
	addStyles();

	const handleClick = value => {
		$$invalidate(6, selected = value);
		$$invalidate(0, open = !open);
		dispatch(root, 'input', { value });
	};

	const handleToggle = event => {
		$$invalidate(0, open = event.detail.open);
	};

	const click_handler = option => handleClick(option);

	function v_collapse_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			root = $$value;
			$$invalidate(2, root);
		});
	}

	$$self.$$set = $$props => {
		if ('options' in $$props) $$invalidate(7, options = $$props.options);
		if ('selected' in $$props) $$invalidate(6, selected = $$props.selected);
		if ('open' in $$props) $$invalidate(0, open = $$props.open);
		if ('placeholder' in $$props) $$invalidate(8, placeholder = $$props.placeholder);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*options*/ 128) {
			$$invalidate(1, parsedOptions = options.split(',').map(str => str.trim()));
		}

		if ($$self.$$.dirty & /*parsedOptions, selected, placeholder*/ 322) {
			$$invalidate(3, selectedOption = parsedOptions.find(opt => opt === selected) || placeholder);
		}
	};

	return [
		open,
		parsedOptions,
		root,
		selectedOption,
		handleClick,
		handleToggle,
		selected,
		options,
		placeholder,
		click_handler,
		v_collapse_binding
	];
}

class Select extends SvelteElement {
	constructor(options) {
		super();

		init(
			this,
			{
				target: this.shadowRoot,
				props: attribute_to_object(this.attributes),
				customElement: true
			},
			instance$3,
			create_fragment$3,
			not_equal,
			{
				options: 7,
				selected: 6,
				open: 0,
				placeholder: 8
			},
			null
		);

		if (options) {
			if (options.target) {
				insert(options.target, this, options.anchor);
			}

			if (options.props) {
				this.$set(options.props);
				flush();
			}
		}
	}

	static get observedAttributes() {
		return ["options", "selected", "open", "placeholder"];
	}

	get options() {
		return this.$$.ctx[7];
	}

	set options(options) {
		this.$$set({ options });
		flush();
	}

	get selected() {
		return this.$$.ctx[6];
	}

	set selected(selected) {
		this.$$set({ selected });
		flush();
	}

	get open() {
		return this.$$.ctx[0];
	}

	set open(open) {
		this.$$set({ open });
		flush();
	}

	get placeholder() {
		return this.$$.ctx[8];
	}

	set placeholder(placeholder) {
		this.$$set({ placeholder });
		flush();
	}
}

customElements.define("v-select", Select);

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

function is_date(obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
}

function tick_spring(ctx, last_value, current_value, target_value) {
    if (typeof current_value === 'number' || is_date(current_value)) {
        // @ts-ignore
        const delta = target_value - current_value;
        // @ts-ignore
        const velocity = (current_value - last_value) / (ctx.dt || 1 / 60); // guard div by 0
        const spring = ctx.opts.stiffness * delta;
        const damper = ctx.opts.damping * velocity;
        const acceleration = (spring - damper) * ctx.inv_mass;
        const d = (velocity + acceleration) * ctx.dt;
        if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
            return target_value; // settled
        }
        else {
            ctx.settled = false; // signal loop to keep ticking
            // @ts-ignore
            return is_date(current_value) ?
                new Date(current_value.getTime() + d) : current_value + d;
        }
    }
    else if (Array.isArray(current_value)) {
        // @ts-ignore
        return current_value.map((_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i]));
    }
    else if (typeof current_value === 'object') {
        const next_value = {};
        for (const k in current_value) {
            // @ts-ignore
            next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
        }
        // @ts-ignore
        return next_value;
    }
    else {
        throw new Error(`Cannot spring ${typeof current_value} values`);
    }
}
function spring(value, opts = {}) {
    const store = writable(value);
    const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
    let last_time;
    let task;
    let current_token;
    let last_value = value;
    let target_value = value;
    let inv_mass = 1;
    let inv_mass_recovery_rate = 0;
    let cancel_task = false;
    function set(new_value, opts = {}) {
        target_value = new_value;
        const token = current_token = {};
        if (value == null || opts.hard || (spring.stiffness >= 1 && spring.damping >= 1)) {
            cancel_task = true; // cancel any running animation
            last_time = now();
            last_value = new_value;
            store.set(value = target_value);
            return Promise.resolve();
        }
        else if (opts.soft) {
            const rate = opts.soft === true ? .5 : +opts.soft;
            inv_mass_recovery_rate = 1 / (rate * 60);
            inv_mass = 0; // infinite mass, unaffected by spring forces
        }
        if (!task) {
            last_time = now();
            cancel_task = false;
            task = loop(now => {
                if (cancel_task) {
                    cancel_task = false;
                    task = null;
                    return false;
                }
                inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
                const ctx = {
                    inv_mass,
                    opts: spring,
                    settled: true,
                    dt: (now - last_time) * 60 / 1000
                };
                const next_value = tick_spring(ctx, last_value, value, target_value);
                last_time = now;
                last_value = value;
                store.set(value = next_value);
                if (ctx.settled) {
                    task = null;
                }
                return !ctx.settled;
            });
        }
        return new Promise(fulfil => {
            task.promise.then(() => {
                if (token === current_token)
                    fulfil();
            });
        });
    }
    const spring = {
        set,
        update: (fn, opts) => set(fn(target_value, value), opts),
        subscribe: store.subscribe,
        stiffness,
        damping,
        precision
    };
    return spring;
}

const clamp = (val, minVal, maxVal) => {
  return val <= minVal ? minVal : val >= maxVal ? maxVal : val;
};
const percentOf = (val, min, max, precision) => {
  const perc = (val - min) / (max - min) * 100;
  if (Number.isNaN(perc) || perc <= 0) {
    return 0;
  } else if (perc >= 100) {
    return 100;
  } else {
    return Number.parseFloat(perc.toFixed(precision));
  }
};

/* src/elements/slider/index.svelte generated by Svelte v3.49.0 */

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[51] = list[i];
	child_ctx[53] = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[54] = list[i];
	child_ctx[56] = i;
	return child_ctx;
}

// (421:8) {#if suffix}
function create_if_block_5(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*suffix*/ ctx[4]);
			attr(span, "class", "floating-suffix");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*suffix*/ 16) set_data(t, /*suffix*/ ctx[4]);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (389:2) {#each endValue ? [startValue, endValue] : [startValue] as value, index}
function create_each_block_1(ctx) {
	let span3;
	let span0;
	let t0;
	let span1;
	let t1;
	let span2;
	let t2_value = /*value*/ ctx[54] + "";
	let t2;
	let t3;
	let span2_class_value;
	let span3_data_handle_value;
	let span3_aria_valuemin_value;
	let span3_aria_valuemax_value;
	let span3_aria_valuenow_value;
	let span3_aria_valuetext_value;
	let span3_tabindex_value;
	let mounted;
	let dispose;
	let if_block = /*suffix*/ ctx[4] && create_if_block_5(ctx);

	function focus_handler() {
		return /*focus_handler*/ ctx[35](/*index*/ ctx[56]);
	}

	return {
		c() {
			span3 = element("span");
			span0 = element("span");
			t0 = space();
			span1 = element("span");
			t1 = space();
			span2 = element("span");
			t2 = text(t2_value);
			t3 = space();
			if (if_block) if_block.c();
			attr(span0, "class", "handle-bg absolute left-0 top-0 rounded-full opacity-50 h-full w-full transition-transform bg-gray-400");
			attr(span1, "class", "absolute left-0 top-0 block rounded-full h-full w-full shadow-lg bg-gray-400");

			attr(span2, "class", span2_class_value = cx('floating text-white block absolute left-1/2 bottom-3/4 -translate-x-1/2 -translate-y-1/2', 'py-1 px-1.5 rounded text-base text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 bg-[#99a2a2]', {
				'-translate-y-1': !/*focus*/ ctx[11] || /*activeHandle*/ ctx[13] !== /*index*/ ctx[56]
			}));

			attr(span3, "role", "slider");
			attr(span3, "class", "range absolute block h-5 w-5 top-1 bottom-auto -translate-x-1/2 -translate-y-1/2 z-[2]");
			attr(span3, "data-handle", span3_data_handle_value = /*index*/ ctx[56]);
			set_style(span3, "left", /*$springPositions*/ ctx[15][/*index*/ ctx[56]] + "%");
			set_style(span3, "z-index", /*activeHandle*/ ctx[13] === /*index*/ ctx[56] ? 3 : 2);

			attr(span3, "aria-valuemin", span3_aria_valuemin_value = /*range*/ ctx[1] === true && /*index*/ ctx[56] === 1
			? /*startValue*/ ctx[7]
			: /*minNum*/ ctx[5]);

			attr(span3, "aria-valuemax", span3_aria_valuemax_value = /*range*/ ctx[1] === true && /*index*/ ctx[56] === 0
			? /*endValue*/ ctx[8]
			: /*maxNum*/ ctx[6]);

			attr(span3, "aria-valuenow", span3_aria_valuenow_value = /*value*/ ctx[54]);
			attr(span3, "aria-valuetext", span3_aria_valuetext_value = /*value*/ ctx[54]?.toString());
			attr(span3, "aria-orientation", "horizontal");
			attr(span3, "aria-disabled", /*disabled*/ ctx[2]);
			attr(span3, "disabled", /*disabled*/ ctx[2]);
			attr(span3, "tabindex", span3_tabindex_value = /*disabled*/ ctx[2] ? -1 : 0);
			toggle_class(span3, "active", /*focus*/ ctx[11] && /*activeHandle*/ ctx[13] === /*index*/ ctx[56]);
			toggle_class(span3, "press", /*handlePressed*/ ctx[12] && /*activeHandle*/ ctx[13] === /*index*/ ctx[56]);
		},
		m(target, anchor) {
			insert(target, span3, anchor);
			append(span3, span0);
			append(span3, t0);
			append(span3, span1);
			append(span3, t1);
			append(span3, span2);
			append(span2, t2);
			append(span2, t3);
			if (if_block) if_block.m(span2, null);

			if (!mounted) {
				dispose = [
					listen(span3, "blur", /*handleSliderBlur*/ ctx[18]),
					listen(span3, "focus", focus_handler)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*endValue, startValue*/ 384 && t2_value !== (t2_value = /*value*/ ctx[54] + "")) set_data(t2, t2_value);

			if (/*suffix*/ ctx[4]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_5(ctx);
					if_block.c();
					if_block.m(span2, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[0] & /*focus, activeHandle*/ 10240 && span2_class_value !== (span2_class_value = cx('floating text-white block absolute left-1/2 bottom-3/4 -translate-x-1/2 -translate-y-1/2', 'py-1 px-1.5 rounded text-base text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 bg-[#99a2a2]', {
				'-translate-y-1': !/*focus*/ ctx[11] || /*activeHandle*/ ctx[13] !== /*index*/ ctx[56]
			}))) {
				attr(span2, "class", span2_class_value);
			}

			if (dirty[0] & /*$springPositions*/ 32768) {
				set_style(span3, "left", /*$springPositions*/ ctx[15][/*index*/ ctx[56]] + "%");
			}

			if (dirty[0] & /*activeHandle*/ 8192) {
				set_style(span3, "z-index", /*activeHandle*/ ctx[13] === /*index*/ ctx[56] ? 3 : 2);
			}

			if (dirty[0] & /*range, startValue, minNum*/ 162 && span3_aria_valuemin_value !== (span3_aria_valuemin_value = /*range*/ ctx[1] === true && /*index*/ ctx[56] === 1
			? /*startValue*/ ctx[7]
			: /*minNum*/ ctx[5])) {
				attr(span3, "aria-valuemin", span3_aria_valuemin_value);
			}

			if (dirty[0] & /*range, endValue, maxNum*/ 322 && span3_aria_valuemax_value !== (span3_aria_valuemax_value = /*range*/ ctx[1] === true && /*index*/ ctx[56] === 0
			? /*endValue*/ ctx[8]
			: /*maxNum*/ ctx[6])) {
				attr(span3, "aria-valuemax", span3_aria_valuemax_value);
			}

			if (dirty[0] & /*endValue, startValue*/ 384 && span3_aria_valuenow_value !== (span3_aria_valuenow_value = /*value*/ ctx[54])) {
				attr(span3, "aria-valuenow", span3_aria_valuenow_value);
			}

			if (dirty[0] & /*endValue, startValue*/ 384 && span3_aria_valuetext_value !== (span3_aria_valuetext_value = /*value*/ ctx[54]?.toString())) {
				attr(span3, "aria-valuetext", span3_aria_valuetext_value);
			}

			if (dirty[0] & /*disabled*/ 4) {
				attr(span3, "aria-disabled", /*disabled*/ ctx[2]);
			}

			if (dirty[0] & /*disabled*/ 4) {
				attr(span3, "disabled", /*disabled*/ ctx[2]);
			}

			if (dirty[0] & /*disabled*/ 4 && span3_tabindex_value !== (span3_tabindex_value = /*disabled*/ ctx[2] ? -1 : 0)) {
				attr(span3, "tabindex", span3_tabindex_value);
			}

			if (dirty[0] & /*focus, activeHandle*/ 10240) {
				toggle_class(span3, "active", /*focus*/ ctx[11] && /*activeHandle*/ ctx[13] === /*index*/ ctx[56]);
			}

			if (dirty[0] & /*handlePressed, activeHandle*/ 12288) {
				toggle_class(span3, "press", /*handlePressed*/ ctx[12] && /*activeHandle*/ ctx[13] === /*index*/ ctx[56]);
			}
		},
		d(detaching) {
			if (detaching) detach(span3);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

// (428:2) {#if range}
function create_if_block_4(ctx) {
	let span;

	return {
		c() {
			span = element("span");
			attr(span, "class", "rangeBar absolute block transition duration-200 rounded-2xl h-2 top-0 select-none z-[1] bg-gray-200");
			set_style(span, "left", /*rangeStart*/ ctx[16](/*$springPositions*/ ctx[15]) + "%");
			set_style(span, "right", /*rangeEnd*/ ctx[17](/*$springPositions*/ ctx[15]) + "%");
		},
		m(target, anchor) {
			insert(target, span, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$springPositions*/ 32768) {
				set_style(span, "left", /*rangeStart*/ ctx[16](/*$springPositions*/ ctx[15]) + "%");
			}

			if (dirty[0] & /*$springPositions*/ 32768) {
				set_style(span, "right", /*rangeEnd*/ ctx[17](/*$springPositions*/ ctx[15]) + "%");
			}
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (442:6) {#if suffix}
function create_if_block_3(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*suffix*/ ctx[4]);
			attr(span, "class", "pipVal-suffix");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*suffix*/ 16) set_data(t, /*suffix*/ ctx[4]);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (447:4) {#if discrete}
function create_if_block_1(ctx) {
	let each_1_anchor;
	let each_value = Array.from({ length: /*pipCount*/ ctx[10] + 1 });
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*pipVal, minNum, maxNum, pipCount*/ 17504) {
				each_value = Array.from({ length: /*pipCount*/ ctx[10] + 1 });
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (449:8) {#if pipVal(i) !== minNum && pipVal(i) !== maxNum}
function create_if_block_2(ctx) {
	let span;

	return {
		c() {
			span = element("span");
			attr(span, "class", "absolute h-[3px] w-[3px] top-[calc(50%-1.5px)] whitespace-nowrap transition bg-gray-400 rounded-full");
			set_style(span, "left", percentOf(/*pipVal*/ ctx[14](/*i*/ ctx[53]), /*minNum*/ ctx[5], /*maxNum*/ ctx[6], 2) + "%");
		},
		m(target, anchor) {
			insert(target, span, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*pipVal, minNum, maxNum*/ 16480) {
				set_style(span, "left", percentOf(/*pipVal*/ ctx[14](/*i*/ ctx[53]), /*minNum*/ ctx[5], /*maxNum*/ ctx[6], 2) + "%");
			}
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (448:6) {#each Array.from({ length: pipCount + 1 }) as _, i}
function create_each_block$1(ctx) {
	let show_if = /*pipVal*/ ctx[14](/*i*/ ctx[53]) !== /*minNum*/ ctx[5] && /*pipVal*/ ctx[14](/*i*/ ctx[53]) !== /*maxNum*/ ctx[6];
	let if_block_anchor;
	let if_block = show_if && create_if_block_2(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*pipVal, minNum, maxNum*/ 16480) show_if = /*pipVal*/ ctx[14](/*i*/ ctx[53]) !== /*minNum*/ ctx[5] && /*pipVal*/ ctx[14](/*i*/ ctx[53]) !== /*maxNum*/ ctx[6];

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_2(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (461:6) {#if suffix}
function create_if_block$1(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*suffix*/ ctx[4]);
			attr(span, "class", "pipVal-suffix");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*suffix*/ 16) set_data(t, /*suffix*/ ctx[4]);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

function create_fragment$2(ctx) {
	let div1;
	let t0;
	let t1;
	let div0;
	let small0;
	let t2;
	let t3;
	let t4;
	let t5;
	let small1;
	let t6;
	let t7;
	let div1_class_value;
	let mounted;
	let dispose;

	let each_value_1 = /*endValue*/ ctx[8]
	? [/*startValue*/ ctx[7], /*endValue*/ ctx[8]]
	: [/*startValue*/ ctx[7]];

	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	let if_block0 = /*range*/ ctx[1] && create_if_block_4(ctx);
	let if_block1 = /*suffix*/ ctx[4] && create_if_block_3(ctx);
	let if_block2 = /*discrete*/ ctx[3] && create_if_block_1(ctx);
	let if_block3 = /*suffix*/ ctx[4] && create_if_block$1(ctx);

	return {
		c() {
			div1 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t0 = space();
			if (if_block0) if_block0.c();
			t1 = space();
			div0 = element("div");
			small0 = element("small");
			t2 = text(/*minNum*/ ctx[5]);
			t3 = space();
			if (if_block1) if_block1.c();
			t4 = space();
			if (if_block2) if_block2.c();
			t5 = space();
			small1 = element("small");
			t6 = text(/*maxNum*/ ctx[6]);
			t7 = space();
			if (if_block3) if_block3.c();
			this.c = noop;
			attr(small0, "class", "absolute bottom-full left-0 mb-2 whitespace-nowrap");
			attr(small1, "class", "absolute bottom-full right-0 mb-2 whitespace-nowrap");
			attr(div0, "class", "absolute h-2 left-0 right-0");
			toggle_class(div0, "disabled", /*disabled*/ ctx[2]);
			toggle_class(div0, "focus", /*focus*/ ctx[11]);
			attr(div1, "class", div1_class_value = cx('slider relative rounded-full h-2 m-4 mt-7 transition-opacity duration-200 select-none pip-labels bg-gray-100', { 'opacity-50': /*disabled*/ ctx[2] }));
			toggle_class(div1, "range", /*range*/ ctx[1]);
			toggle_class(div1, "focus", /*focus*/ ctx[11]);
			toggle_class(div1, "min", /*range*/ ctx[1] === 'min');
			toggle_class(div1, "max", /*range*/ ctx[1] === 'max');
		},
		m(target, anchor) {
			insert(target, div1, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			append(div1, t0);
			if (if_block0) if_block0.m(div1, null);
			append(div1, t1);
			append(div1, div0);
			append(div0, small0);
			append(small0, t2);
			append(small0, t3);
			if (if_block1) if_block1.m(small0, null);
			append(div0, t4);
			if (if_block2) if_block2.m(div0, null);
			append(div0, t5);
			append(div0, small1);
			append(small1, t6);
			append(small1, t7);
			if (if_block3) if_block3.m(small1, null);
			/*div1_binding*/ ctx[36](div1);

			if (!mounted) {
				dispose = [
					listen(window, "mousedown", /*bodyInteractStart*/ ctx[22]),
					listen(window, "touchstart", /*bodyInteractStart*/ ctx[22]),
					listen(window, "mousemove", /*bodyInteract*/ ctx[23]),
					listen(window, "touchmove", /*bodyInteract*/ ctx[23]),
					listen(window, "mouseup", /*bodyMouseUp*/ ctx[24]),
					listen(window, "touchend", /*bodyTouchEnd*/ ctx[25]),
					listen(window, "keydown", /*bodyKeyDown*/ ctx[26]),
					listen(div1, "mousedown", /*sliderInteractStart*/ ctx[20]),
					listen(div1, "mouseup", /*sliderInteractEnd*/ ctx[21]),
					listen(div1, "touchstart", prevent_default(/*sliderInteractStart*/ ctx[20])),
					listen(div1, "touchend", prevent_default(/*sliderInteractEnd*/ ctx[21]))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$springPositions, activeHandle, range, startValue, minNum, endValue, maxNum, disabled, focus, handlePressed, handleSliderBlur, handleSliderFocus, suffix*/ 834038) {
				each_value_1 = /*endValue*/ ctx[8]
				? [/*startValue*/ ctx[7], /*endValue*/ ctx[8]]
				: [/*startValue*/ ctx[7]];

				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div1, t0);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}

			if (/*range*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_4(ctx);
					if_block0.c();
					if_block0.m(div1, t1);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*minNum*/ 32) set_data(t2, /*minNum*/ ctx[5]);

			if (/*suffix*/ ctx[4]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_3(ctx);
					if_block1.c();
					if_block1.m(small0, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*discrete*/ ctx[3]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_1(ctx);
					if_block2.c();
					if_block2.m(div0, t5);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (dirty[0] & /*maxNum*/ 64) set_data(t6, /*maxNum*/ ctx[6]);

			if (/*suffix*/ ctx[4]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block$1(ctx);
					if_block3.c();
					if_block3.m(small1, null);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (dirty[0] & /*disabled*/ 4) {
				toggle_class(div0, "disabled", /*disabled*/ ctx[2]);
			}

			if (dirty[0] & /*focus*/ 2048) {
				toggle_class(div0, "focus", /*focus*/ ctx[11]);
			}

			if (dirty[0] & /*disabled*/ 4 && div1_class_value !== (div1_class_value = cx('slider relative rounded-full h-2 m-4 mt-7 transition-opacity duration-200 select-none pip-labels bg-gray-100', { 'opacity-50': /*disabled*/ ctx[2] }))) {
				attr(div1, "class", div1_class_value);
			}

			if (dirty[0] & /*disabled, range*/ 6) {
				toggle_class(div1, "range", /*range*/ ctx[1]);
			}

			if (dirty[0] & /*disabled, focus*/ 2052) {
				toggle_class(div1, "focus", /*focus*/ ctx[11]);
			}

			if (dirty[0] & /*disabled, range*/ 6) {
				toggle_class(div1, "min", /*range*/ ctx[1] === 'min');
			}

			if (dirty[0] & /*disabled, range*/ 6) {
				toggle_class(div1, "max", /*range*/ ctx[1] === 'max');
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
			destroy_each(each_blocks, detaching);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			/*div1_binding*/ ctx[36](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let pipVal;

	let $springPositions,
		$$unsubscribe_springPositions = noop,
		$$subscribe_springPositions = () => ($$unsubscribe_springPositions(), $$unsubscribe_springPositions = subscribe(springPositions, $$value => $$invalidate(15, $springPositions = $$value)), springPositions);

	$$self.$$.on_destroy.push(() => $$unsubscribe_springPositions());
	let { slider } = $$props;
	let { range = false } = $$props;
	let { min } = $$props;
	let { max } = $$props;
	let { step } = $$props;
	let { start } = $$props;
	let { end } = $$props;
	let { disabled = false } = $$props;
	let { discrete = true } = $$props;
	let { suffix = '' } = $$props;
	addStyles();
	const springValues = { stiffness: 0.1, damping: 0.4 };
	let minNum;
	let maxNum;
	let stepNum;
	let startValue;
	let endValue;
	let pipStep;
	let pipCount;

	// state management
	let valueLength = 0;

	let focus = false;
	let handleActivated = false;
	let handlePressed = false;
	let keyboardActive = false;
	let activeHandle = -1;
	let previousValue;
	let sliderDimensions;

	// copy the initial values in to a spring function which
	// will update every time the values array is modified
	let springPositions;

	/**
 * align the value with the steps so that it
 * always sits on the closest (above/below) step
 **/
	const alignValueToStep = (val, minVal, maxVal) => {
		// sanity check for performance
		if (val <= minVal) {
			return minVal;
		} else if (val >= maxVal) {
			return maxVal;
		}

		// find the middle-point between steps
		// and see if the value is closer to the
		// next step, or previous step
		const remainder = (val - minVal) % stepNum;

		let aligned = val - remainder;

		if (Math.abs(remainder) * 2 >= stepNum) {
			aligned += remainder > 0 ? stepNum : -stepNum;
		}

		// make sure the value is within acceptable limits
		aligned = clamp(aligned, minVal, maxVal);

		// make sure the returned value is set to the precision desired
		// this is also because javascript often returns weird floats
		// when dealing with odd numbers and percentages
		return Number.parseFloat(aligned.toFixed(2));
	};

	/**
 * normalise a mouse or touch event to return the
 * client (x/y) object for that event
 **/
	const normalisedClient = event => {
		return event.type.includes('touch') ? event.touches[0] : event;
	};

	/**
 * check if an element is a handle on the slider
 **/
	const targetIsHandle = el => {
		const handles = [...slider.querySelectorAll('.handle')];
		const isHandle = handles.includes(el);
		const isChild = handles.some(e => e.contains(el));
		return isHandle || isChild;
	};

	/**
 * trim the values array based on whether the property
 * for 'range' is 'min', 'max', or truthy. This is because we
 * do not want more than one handle for a min/max range, and we do
 * not want more than two handles for a true range.
 **/
	const trimRange = arr => {
		if (range === 'min' || range === 'max') {
			return arr.slice(0, 1);
		} else if (range) {
			return arr.slice(0, 2);
		} else {
			return arr;
		}
	};

	const getSliderDimensions = () => {
		sliderDimensions = slider.getBoundingClientRect();
	};

	/**
 * helper to return closest handle to user interaction
 **/
	const getClosestHandle = clientPos => {
		// calculate the interaction position, percent and value
		const handlePos = clientPos.clientX - sliderDimensions.left;

		const handlePercent = handlePos / sliderDimensions.width * 100;
		const handleVal = (maxNum - minNum) / 100 * handlePercent + minNum;
		let closest = 0;

		// if we have a range, and the handles are at the same
		// position, we want a simple check if the interaction
		// value is greater than return the second handle
		if (range && startValue === endValue) {
			return handleVal > endValue ? 1 : 0;
		} else if (range) {
			closest = [startValue, endValue].indexOf([startValue, endValue].sort((a, b) => Math.abs(handleVal - a) - Math.abs(handleVal - b))[0]);
		}

		return closest;
	};

	/**
 * take the interaction position on the slider, convert
 * it to a value on the range, and then send that value
 * through to the moveHandle() method to set the active
 * handle's position
 **/
	const handleInteract = clientPos => {
		// calculate the interaction position, percent and value
		const handlePos = clientPos.clientX - sliderDimensions.left;

		const handlePercent = handlePos / sliderDimensions.width * 100;
		const handleVal = (maxNum - minNum) / 100 * handlePercent + minNum;

		// move handle to the value
		moveHandle(activeHandle, handleVal);
	};

	/**
 * move a handle to a specific value, respecting the clamp/align rules
 **/
	const moveHandle = (i, value) => {
		let index = i;

		// align & clamp the value so we're not doing extra
		// calculation on an out-of-range value down below
		const alignedValue = alignValueToStep(value, minNum, maxNum);

		// use the active handle if handle index is not provided
		if (typeof index === 'undefined') {
			index = activeHandle;
		}

		// if this is a range slider perform special checks
		if (range) {
			if (index === 0 && alignedValue > endValue) {
				$$invalidate(8, endValue = alignedValue);
			} else if (index === 1 && alignedValue < startValue) {
				$$invalidate(7, startValue = alignedValue);
			}
		}

		// if the value has changed, update it
		if (index === 0 && startValue !== alignedValue) {
			$$invalidate(7, startValue = alignedValue);
		}

		if (index === 1 && endValue !== alignedValue) {
			$$invalidate(8, endValue = alignedValue);
		}

		// fire the change event when the handle moves,
		// and store the previous value for the next time
		if (previousValue !== alignedValue) {
			onChange();
			previousValue = alignedValue;
		}

		if (index === 0) {
			$$invalidate(27, start = startValue.toString());
		} else if (index === 1) {
			$$invalidate(28, end = endValue.toString());
		}

		return alignedValue;
	};

	/**
 * helper to find the beginning range value for use with css style
 **/
	const rangeStart = arr => {
		return range === 'min' ? 0 : arr[0];
	};

	/**
 * helper to find the ending range value for use with css style
 **/
	const rangeEnd = arr => {
		if (range === 'max') {
			return 0;
		} else if (range === 'min') {
			return 100 - arr[0];
		} else {
			return 100 - arr[1];
		}
	};

	/**
 * when the user has unfocussed (blurred) from the
 * slider, deactivate all handles
 **/
	const handleSliderBlur = () => {
		if (keyboardActive) {
			$$invalidate(11, focus = false);
			handleActivated = false;
			$$invalidate(12, handlePressed = false);
		}
	};

	/**
 * when the user focusses the handle of a slider
 * set it to be active
 **/
	const handleSliderFocus = index => {
		if (!disabled) {
			$$invalidate(13, activeHandle = index);
			$$invalidate(11, focus = true);
		}
	};

	/**
 * function to run when the user touches
 * down on the slider element anywhere
 * @param {event} e the event from browser
 **/
	const sliderInteractStart = e => {
		if (disabled) return;
		getSliderDimensions();
		const el = e.target;
		const clientPos = normalisedClient(e);

		// set the closest handle as active
		$$invalidate(11, focus = true);

		handleActivated = true;
		$$invalidate(12, handlePressed = true);
		$$invalidate(13, activeHandle = getClosestHandle(clientPos));
		previousValue = alignValueToStep(activeHandle === 0 ? startValue : endValue, minNum, maxNum);

		// for touch devices we want the handle to instantly
		// move to the position touched for more responsive feeling
		if (e.type === 'touchstart' && !el.matches('.pipVal')) {
			handleInteract(clientPos);
		}
	};

	const sliderInteractEnd = () => {
		$$invalidate(12, handlePressed = false);
	};

	/**
 * unfocus the slider if the user clicked off of
 * it, somewhere else on the screen
 **/
	const bodyInteractStart = e => {
		keyboardActive = false;

		if (focus && e.target !== slider && !slider.contains(e.target)) {
			$$invalidate(11, focus = false);
		}
	};

	/**
 * send the clientX through to handle the interaction
 * whenever the user moves acros screen while active
 * @param {event} e the event from browser
 **/
	const bodyInteract = e => {
		if (disabled || !handleActivated) return;
		$$invalidate(11, focus = true);
		handleInteract(normalisedClient(e));
	};

	/**
 * if user triggers mouseup on the body while
 * a handle is active (without moving) then we
 * trigger an interact event there
 **/
	const bodyMouseUp = e => {
		if (!disabled) {
			const el = e.target;

			// this only works if a handle is active, which can
			// only happen if there was sliderInteractStart triggered
			// on the slider, already
			if (handleActivated && el && el === slider || slider.contains(el)) {
				$$invalidate(11, focus = true);

				// don't trigger interact if the target is a handle (no need) or
				// if the target is a label (we want to move to that value from rangePips)
				if (!targetIsHandle(el) && !el.matches('.pipVal')) {
					handleInteract(normalisedClient(e));
				}
			}
		}

		handleActivated = false;
		$$invalidate(12, handlePressed = false);
	};

	/**
 * if user triggers touchend on the body then we
 * defocus the slider completely
 **/
	const bodyTouchEnd = () => {
		handleActivated = false;
		$$invalidate(12, handlePressed = false);
	};

	const bodyKeyDown = e => {
		if (disabled) return;

		if (e.target === slider || slider.contains(e.target)) {
			keyboardActive = true;
		}
	};

	const onChange = () => {
		if (disabled) return;

		dispatch(slider, 'input', {
			activeHandle,
			previousValue,
			value: activeHandle === 0 ? startValue : endValue,
			values: endValue
			? [startValue, endValue].map(v => alignValueToStep(v, minNum, maxNum))
			: undefined
		});
	};

	const focus_handler = index => handleSliderFocus(index);

	function div1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			slider = $$value;
			$$invalidate(0, slider);
		});
	}

	$$self.$$set = $$props => {
		if ('slider' in $$props) $$invalidate(0, slider = $$props.slider);
		if ('range' in $$props) $$invalidate(1, range = $$props.range);
		if ('min' in $$props) $$invalidate(29, min = $$props.min);
		if ('max' in $$props) $$invalidate(30, max = $$props.max);
		if ('step' in $$props) $$invalidate(31, step = $$props.step);
		if ('start' in $$props) $$invalidate(27, start = $$props.start);
		if ('end' in $$props) $$invalidate(28, end = $$props.end);
		if ('disabled' in $$props) $$invalidate(2, disabled = $$props.disabled);
		if ('discrete' in $$props) $$invalidate(3, discrete = $$props.discrete);
		if ('suffix' in $$props) $$invalidate(4, suffix = $$props.suffix);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*max*/ 1073741824) {
			$$invalidate(6, maxNum = Number.parseFloat(max || '100'));
		}

		if ($$self.$$.dirty[0] & /*min*/ 536870912) {
			$$invalidate(5, minNum = Number.parseFloat(min || '0'));
		}

		if ($$self.$$.dirty[1] & /*step*/ 1) {
			$$invalidate(32, stepNum = Number.parseFloat(step || '1'));
		}

		if ($$self.$$.dirty[0] & /*maxNum, minNum*/ 96 | $$self.$$.dirty[1] & /*stepNum*/ 2) {
			$$invalidate(33, pipStep = (maxNum - minNum) / stepNum >= 100
			? (maxNum - minNum) / 20
			: 1);
		}

		if ($$self.$$.dirty[0] & /*maxNum, minNum*/ 96 | $$self.$$.dirty[1] & /*stepNum*/ 2) {
			$$invalidate(10, pipCount = (maxNum - minNum) / stepNum);
		}

		if ($$self.$$.dirty[0] & /*minNum*/ 32 | $$self.$$.dirty[1] & /*stepNum, pipStep*/ 6) {
			$$invalidate(14, pipVal = val => minNum + val * stepNum * pipStep);
		}

		if ($$self.$$.dirty[0] & /*start, min, max*/ 1744830464) {
			$$invalidate(7, startValue = start
			? Number.parseFloat(start)
			: (Number.parseFloat(min || '0') + Number.parseFloat(max || '100')) / 2);
		}

		if ($$self.$$.dirty[0] & /*end*/ 268435456) {
			$$invalidate(8, endValue = end ? Number.parseFloat(end) : undefined);
		}

		if ($$self.$$.dirty[0] & /*startValue, minNum, maxNum, endValue, springPositions*/ 992 | $$self.$$.dirty[1] & /*valueLength*/ 8) {
			{
				// trim the range so it remains as a min/max (only 2 handles)
				// and also align the handles to the steps
				$$invalidate(7, startValue = alignValueToStep(startValue, minNum, maxNum));

				let arr = [startValue];

				if (endValue) {
					$$invalidate(8, endValue = alignValueToStep(endValue, minNum, maxNum));
					arr.push(endValue);
				}

				arr = trimRange(arr);

				// check if the valueLength (length of values[]) has changed,
				// because if so we need to re-seed the spring function with the
				// new values array.
				if (valueLength !== arr.length) {
					// set the initial spring values when the slider initialises,
					// or when values array length has changed
					$$subscribe_springPositions($$invalidate(9, springPositions = spring(arr.map(v => percentOf(v, minNum, maxNum, 2)), springValues)));
				} else {
					// update the value of the spring function for animated handles
					// whenever the values has updated
					springPositions.set(arr.map(v => percentOf(v, minNum, maxNum, 2))).catch(error => console.error(error));
				}

				// set the valueLength for the next check
				$$invalidate(34, valueLength = arr.length);
			}
		}
	};

	return [
		slider,
		range,
		disabled,
		discrete,
		suffix,
		minNum,
		maxNum,
		startValue,
		endValue,
		springPositions,
		pipCount,
		focus,
		handlePressed,
		activeHandle,
		pipVal,
		$springPositions,
		rangeStart,
		rangeEnd,
		handleSliderBlur,
		handleSliderFocus,
		sliderInteractStart,
		sliderInteractEnd,
		bodyInteractStart,
		bodyInteract,
		bodyMouseUp,
		bodyTouchEnd,
		bodyKeyDown,
		start,
		end,
		min,
		max,
		step,
		stepNum,
		pipStep,
		valueLength,
		focus_handler,
		div1_binding
	];
}

class Slider extends SvelteElement {
	constructor(options) {
		super();
		this.shadowRoot.innerHTML = `<style>.slider .range:hover .handle-bg{transform:scale(1.5)}.slider .range.active .handle-bg{transform:scale(2.0)}.slider .range.active .floating,.slider .range:hover .floating{opacity:1}</style>`;

		init(
			this,
			{
				target: this.shadowRoot,
				props: attribute_to_object(this.attributes),
				customElement: true
			},
			instance$2,
			create_fragment$2,
			safe_not_equal,
			{
				slider: 0,
				range: 1,
				min: 29,
				max: 30,
				step: 31,
				start: 27,
				end: 28,
				disabled: 2,
				discrete: 3,
				suffix: 4
			},
			null,
			[-1, -1]
		);

		if (options) {
			if (options.target) {
				insert(options.target, this, options.anchor);
			}

			if (options.props) {
				this.$set(options.props);
				flush();
			}
		}
	}

	static get observedAttributes() {
		return [
			"slider",
			"range",
			"min",
			"max",
			"step",
			"start",
			"end",
			"disabled",
			"discrete",
			"suffix"
		];
	}

	get slider() {
		return this.$$.ctx[0];
	}

	set slider(slider) {
		this.$$set({ slider });
		flush();
	}

	get range() {
		return this.$$.ctx[1];
	}

	set range(range) {
		this.$$set({ range });
		flush();
	}

	get min() {
		return this.$$.ctx[29];
	}

	set min(min) {
		this.$$set({ min });
		flush();
	}

	get max() {
		return this.$$.ctx[30];
	}

	set max(max) {
		this.$$set({ max });
		flush();
	}

	get step() {
		return this.$$.ctx[31];
	}

	set step(step) {
		this.$$set({ step });
		flush();
	}

	get start() {
		return this.$$.ctx[27];
	}

	set start(start) {
		this.$$set({ start });
		flush();
	}

	get end() {
		return this.$$.ctx[28];
	}

	set end(end) {
		this.$$set({ end });
		flush();
	}

	get disabled() {
		return this.$$.ctx[2];
	}

	set disabled(disabled) {
		this.$$set({ disabled });
		flush();
	}

	get discrete() {
		return this.$$.ctx[3];
	}

	set discrete(discrete) {
		this.$$set({ discrete });
		flush();
	}

	get suffix() {
		return this.$$.ctx[4];
	}

	set suffix(suffix) {
		this.$$set({ suffix });
		flush();
	}
}

customElements.define("v-slider", Slider);

/* src/elements/switch/index.svelte generated by Svelte v3.49.0 */

function create_if_block(ctx) {
	let p;
	let t;

	return {
		c() {
			p = element("p");
			t = text(/*value*/ ctx[0]);
			attr(p, "class", "capitalize text-xs");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t);
		},
		p(ctx, dirty) {
			if (dirty & /*value*/ 1) set_data(t, /*value*/ ctx[0]);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

function create_fragment$1(ctx) {
	let label_1;
	let button_1;
	let span;
	let t0;
	let input_1;
	let button_1_class_value;
	let button_1_aria_checked_value;
	let t1;
	let label_1_class_value;
	let mounted;
	let dispose;
	let if_block = /*variant*/ ctx[3] === 'labeled' && create_if_block(ctx);

	return {
		c() {
			label_1 = element("label");
			button_1 = element("button");
			span = element("span");
			t0 = space();
			input_1 = element("input");
			t1 = space();
			if (if_block) if_block.c();
			this.c = noop;
			attr(span, "class", "pointer-events-none relative inline-block border border-green/100 h-4 w-4 mt-px ml-px bg-white shadow transform ring-0 motion-safe:transition-transform ease-in-out duration-200");
			toggle_class(span, "translate-x-0", !/*on*/ ctx[5]);
			toggle_class(span, "translate-x-6", /*on*/ ctx[5]);
			attr(input_1, "name", /*name*/ ctx[2]);
			input_1.value = /*value*/ ctx[0];
			attr(input_1, "class", "hidden");
			attr(input_1, "type", "checkbox");
			input_1.checked = /*on*/ ctx[5];
			attr(button_1, "type", "button");
			attr(button_1, "class", button_1_class_value = cx('relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none', { 'bg-green/80': /*on*/ ctx[5] }));
			attr(button_1, "role", "switch");
			attr(button_1, "aria-label", /*label*/ ctx[1]);
			attr(button_1, "aria-checked", button_1_aria_checked_value = /*on*/ ctx[5] ? 'true' : 'false');

			attr(label_1, "class", label_1_class_value = cx('flex items-center gap-1.5', {
				'opacity-50 pointer-events-none': /*isDisabled*/ ctx[6]
			}));
		},
		m(target, anchor) {
			insert(target, label_1, anchor);
			append(label_1, button_1);
			append(button_1, span);
			append(button_1, t0);
			append(button_1, input_1);
			/*input_1_binding*/ ctx[9](input_1);
			append(label_1, t1);
			if (if_block) if_block.m(label_1, null);

			if (!mounted) {
				dispose = listen(button_1, "click", /*handleClick*/ ctx[7]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*on*/ 32) {
				toggle_class(span, "translate-x-0", !/*on*/ ctx[5]);
			}

			if (dirty & /*on*/ 32) {
				toggle_class(span, "translate-x-6", /*on*/ ctx[5]);
			}

			if (dirty & /*name*/ 4) {
				attr(input_1, "name", /*name*/ ctx[2]);
			}

			if (dirty & /*value*/ 1) {
				input_1.value = /*value*/ ctx[0];
			}

			if (dirty & /*on*/ 32) {
				input_1.checked = /*on*/ ctx[5];
			}

			if (dirty & /*on*/ 32 && button_1_class_value !== (button_1_class_value = cx('relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none', { 'bg-green/80': /*on*/ ctx[5] }))) {
				attr(button_1, "class", button_1_class_value);
			}

			if (dirty & /*label*/ 2) {
				attr(button_1, "aria-label", /*label*/ ctx[1]);
			}

			if (dirty & /*on*/ 32 && button_1_aria_checked_value !== (button_1_aria_checked_value = /*on*/ ctx[5] ? 'true' : 'false')) {
				attr(button_1, "aria-checked", button_1_aria_checked_value);
			}

			if (/*variant*/ ctx[3] === 'labeled') {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(label_1, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*isDisabled*/ 64 && label_1_class_value !== (label_1_class_value = cx('flex items-center gap-1.5', {
				'opacity-50 pointer-events-none': /*isDisabled*/ ctx[6]
			}))) {
				attr(label_1, "class", label_1_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(label_1);
			/*input_1_binding*/ ctx[9](null);
			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let { label = '' } = $$props;
	let { name = '' } = $$props;
	let { value = 'off' } = $$props;
	let { variant = 'default' } = $$props;
	let { disabled = 'false' } = $$props;
	addStyles();
	let button;
	let input;
	let on;
	let isDisabled;

	const handleClick = () => {
		$$invalidate(0, value = !on ? 'on' : 'off');
		$$invalidate(4, input.checked = on, input);
		dispatch(button, 'input', { value: input.checked });
	};

	function input_1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			input = $$value;
			$$invalidate(4, input);
		});
	}

	$$self.$$set = $$props => {
		if ('label' in $$props) $$invalidate(1, label = $$props.label);
		if ('name' in $$props) $$invalidate(2, name = $$props.name);
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('variant' in $$props) $$invalidate(3, variant = $$props.variant);
		if ('disabled' in $$props) $$invalidate(8, disabled = $$props.disabled);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 1) {
			$$invalidate(5, on = value === 'on');
		}

		if ($$self.$$.dirty & /*disabled*/ 256) {
			$$invalidate(6, isDisabled = disabled === 'true');
		}
	};

	return [
		value,
		label,
		name,
		variant,
		input,
		on,
		isDisabled,
		handleClick,
		disabled,
		input_1_binding
	];
}

class Switch extends SvelteElement {
	constructor(options) {
		super();

		init(
			this,
			{
				target: this.shadowRoot,
				props: attribute_to_object(this.attributes),
				customElement: true
			},
			instance$1,
			create_fragment$1,
			not_equal,
			{
				label: 1,
				name: 2,
				value: 0,
				variant: 3,
				disabled: 8
			},
			null
		);

		if (options) {
			if (options.target) {
				insert(options.target, this, options.anchor);
			}

			if (options.props) {
				this.$set(options.props);
				flush();
			}
		}
	}

	static get observedAttributes() {
		return ["label", "name", "value", "variant", "disabled"];
	}

	get label() {
		return this.$$.ctx[1];
	}

	set label(label) {
		this.$$set({ label });
		flush();
	}

	get name() {
		return this.$$.ctx[2];
	}

	set name(name) {
		this.$$set({ name });
		flush();
	}

	get value() {
		return this.$$.ctx[0];
	}

	set value(value) {
		this.$$set({ value });
		flush();
	}

	get variant() {
		return this.$$.ctx[3];
	}

	set variant(variant) {
		this.$$set({ variant });
		flush();
	}

	get disabled() {
		return this.$$.ctx[8];
	}

	set disabled(disabled) {
		this.$$set({ disabled });
		flush();
	}
}

customElements.define("v-switch", Switch);

/* src/elements/tabs/index.svelte generated by Svelte v3.49.0 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	child_ctx[10] = i;
	return child_ctx;
}

// (18:2) {#each parsedTabs as tab, index (tab)}
function create_each_block(key_1, ctx) {
	let button;
	let t0_value = /*tab*/ ctx[8] + "";
	let t0;
	let t1;
	let button_class_value;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[6](/*tab*/ ctx[8]);
	}

	return {
		key: key_1,
		first: null,
		c() {
			button = element("button");
			t0 = text(t0_value);
			t1 = space();

			attr(button, "class", button_class_value = cx('px-4 py-1 uppercase text-sm first:ml-4', {
				'bg-white border border-x-black border-t-black border-b-white font-bold': /*tab*/ ctx[8] === /*selected*/ ctx[0],
				'text-black/70': /*tab*/ ctx[8] !== /*selected*/ ctx[0],
				'border-l border-l-gray-300': /*selectedIndex*/ ctx[3] > /*index*/ ctx[10],
				'border-r border-r-gray-300': /*selectedIndex*/ ctx[3] < /*index*/ ctx[10]
			}));

			this.first = button;
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, t0);
			append(button, t1);

			if (!mounted) {
				dispose = listen(button, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*parsedTabs*/ 2 && t0_value !== (t0_value = /*tab*/ ctx[8] + "")) set_data(t0, t0_value);

			if (dirty & /*parsedTabs, selected, selectedIndex*/ 11 && button_class_value !== (button_class_value = cx('px-4 py-1 uppercase text-sm first:ml-4', {
				'bg-white border border-x-black border-t-black border-b-white font-bold': /*tab*/ ctx[8] === /*selected*/ ctx[0],
				'text-black/70': /*tab*/ ctx[8] !== /*selected*/ ctx[0],
				'border-l border-l-gray-300': /*selectedIndex*/ ctx[3] > /*index*/ ctx[10],
				'border-r border-r-gray-300': /*selectedIndex*/ ctx[3] < /*index*/ ctx[10]
			}))) {
				attr(button, "class", button_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment(ctx) {
	let div;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_value = /*parsedTabs*/ ctx[1];
	const get_key = ctx => /*tab*/ ctx[8];

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.c = noop;
			attr(div, "class", "w-full flex bg-black/20");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			/*div_binding*/ ctx[7](div);
		},
		p(ctx, [dirty]) {
			if (dirty & /*cx, parsedTabs, selected, selectedIndex, handleClick*/ 27) {
				each_value = /*parsedTabs*/ ctx[1];
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, destroy_block, create_each_block, null, get_each_context);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			/*div_binding*/ ctx[7](null);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let parsedTabs;
	let selectedIndex;
	let { tabs = '' } = $$props;
	let { selected = '' } = $$props;
	let root;
	addStyles();

	const handleClick = option => {
		$$invalidate(0, selected = option);
		dispatch(root, 'input', { value: selected });
	};

	const click_handler = tab => handleClick(tab);

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			root = $$value;
			$$invalidate(2, root);
		});
	}

	$$self.$$set = $$props => {
		if ('tabs' in $$props) $$invalidate(5, tabs = $$props.tabs);
		if ('selected' in $$props) $$invalidate(0, selected = $$props.selected);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*tabs*/ 32) {
			$$invalidate(1, parsedTabs = tabs.split(',').map(str => str.trim()));
		}

		if ($$self.$$.dirty & /*parsedTabs, selected*/ 3) {
			$$invalidate(3, selectedIndex = parsedTabs.indexOf(selected));
		}
	};

	return [
		selected,
		parsedTabs,
		root,
		selectedIndex,
		handleClick,
		tabs,
		click_handler,
		div_binding
	];
}

class Tabs extends SvelteElement {
	constructor(options) {
		super();

		init(
			this,
			{
				target: this.shadowRoot,
				props: attribute_to_object(this.attributes),
				customElement: true
			},
			instance,
			create_fragment,
			not_equal,
			{ tabs: 5, selected: 0 },
			null
		);

		if (options) {
			if (options.target) {
				insert(options.target, this, options.anchor);
			}

			if (options.props) {
				this.$set(options.props);
				flush();
			}
		}
	}

	static get observedAttributes() {
		return ["tabs", "selected"];
	}

	get tabs() {
		return this.$$.ctx[5];
	}

	set tabs(tabs) {
		this.$$set({ tabs });
		flush();
	}

	get selected() {
		return this.$$.ctx[0];
	}

	set selected(selected) {
		this.$$set({ selected });
		flush();
	}
}

customElements.define("v-tabs", Tabs);
