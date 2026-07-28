/* @ds-bundle: {"format":3,"namespace":"RoutineFlowDesignSystem_8e3ffe","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Checkbox","sourcePath":"components/core/Checkbox.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"ProgressBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"SegmentedTabs","sourcePath":"components/core/SegmentedTabs.jsx"},{"name":"AreaCard","sourcePath":"components/routine/AreaCard.jsx"},{"name":"DateNavBar","sourcePath":"components/routine/DateNavBar.jsx"},{"name":"Heatmap","sourcePath":"components/routine/Heatmap.jsx"},{"name":"StreakCard","sourcePath":"components/routine/StreakCard.jsx"},{"name":"TaskItem","sourcePath":"components/routine/TaskItem.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"a13f064880a5","components/core/Button.jsx":"81f7b69e8403","components/core/Card.jsx":"5a81e36fc20c","components/core/Checkbox.jsx":"9207b92ff065","components/core/Input.jsx":"144bf8627de2","components/core/ProgressBar.jsx":"06223946cc76","components/core/SegmentedTabs.jsx":"8e188cbbcf31","components/routine/AreaCard.jsx":"f89697929e3a","components/routine/DateNavBar.jsx":"0a833a13d34f","components/routine/Heatmap.jsx":"2fae43dca176","components/routine/StreakCard.jsx":"043d917e34b9","components/routine/TaskItem.jsx":"7641fb4469cb","ui_kits/routineflow/App.jsx":"c887f897cde4","ui_kits/routineflow/Icons.jsx":"eecbe48c15df","ui_kits/routineflow/data.js":"bc957d51f145","ui_kits/routineflow/screens.jsx":"456635fb7265"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RoutineFlowDesignSystem_8e3ffe = window.RoutineFlowDesignSystem_8e3ffe || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small status/label pill. Neutral by default; tinted semantic variants;
 * optional `dot` for a leading status dot; `count` style for numeric counters.
 */
function Badge({
  variant = 'neutral',
  dot = false,
  children,
  style = {},
  ...props
}) {
  const map = {
    neutral: {
      bg: 'var(--surface-3)',
      fg: 'var(--text-lo)',
      bd: 'transparent'
    },
    accent: {
      bg: 'var(--accent-bg)',
      fg: 'var(--accent)',
      bd: 'var(--accent-border)'
    },
    success: {
      bg: 'var(--success-bg)',
      fg: 'var(--success)',
      bd: 'transparent'
    },
    warning: {
      bg: 'var(--warning-bg)',
      fg: 'var(--warning)',
      bd: 'transparent'
    },
    danger: {
      bg: 'var(--danger-bg)',
      fg: 'var(--danger)',
      bd: 'transparent'
    },
    outline: {
      bg: 'transparent',
      fg: 'var(--text-lo)',
      bd: 'var(--border)'
    }
  };
  const c = map[variant] || map.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({}, props, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: 20,
      padding: '0 8px',
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 'var(--fw-semibold)',
      lineHeight: 1,
      borderRadius: 'var(--radius-full)',
      background: c.bg,
      color: c.fg,
      border: `1px solid ${c.bd}`,
      whiteSpace: 'nowrap',
      ...style
    }
  }), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: c.fg,
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: 32,
    padding: '0 12px',
    fontSize: 13,
    gap: 6
  },
  md: {
    height: 38,
    padding: '0 16px',
    fontSize: 14,
    gap: 7
  },
  lg: {
    height: 44,
    padding: '0 22px',
    fontSize: 15,
    gap: 8
  },
  icon: {
    height: 38,
    width: 38,
    padding: 0,
    fontSize: 14,
    gap: 0
  }
};
function palette(variant, hover, active) {
  switch (variant) {
    case 'secondary':
      return {
        background: active ? 'var(--surface-4)' : hover ? 'var(--surface-3)' : 'var(--surface-2)',
        color: 'var(--text-hi)',
        border: '1px solid var(--border)'
      };
    case 'ghost':
      return {
        background: active ? 'var(--surface-3)' : hover ? 'var(--surface-2)' : 'transparent',
        color: hover ? 'var(--text-hi)' : 'var(--text-lo)',
        border: '1px solid transparent'
      };
    case 'danger':
      return {
        background: active ? '#E03A30' : hover ? 'var(--danger-hover)' : 'var(--danger)',
        color: '#fff',
        border: '1px solid transparent'
      };
    case 'link':
      return {
        background: 'transparent',
        color: hover ? 'var(--accent-hover)' : 'var(--accent)',
        border: '1px solid transparent',
        textDecoration: hover ? 'underline' : 'none',
        textUnderlineOffset: 3
      };
    case 'primary':
    default:
      return {
        background: active ? 'var(--accent-press)' : hover ? 'var(--accent-hover)' : 'var(--accent)',
        color: 'var(--accent-fg)',
        border: '1px solid transparent'
      };
  }
}

/**
 * Primary action button. Variants: primary | secondary | ghost | danger | link.
 */
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon = null,
  rightIcon = null,
  fullWidth = false,
  children,
  style = {},
  ...props
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const pal = palette(variant, hover && !disabled, active && !disabled);
  return /*#__PURE__*/React.createElement("button", _extends({}, props, {
    disabled: disabled || loading,
    onMouseEnter: e => {
      setHover(true);
      props.onMouseEnter?.(e);
    },
    onMouseLeave: e => {
      setHover(false);
      setActive(false);
      props.onMouseLeave?.(e);
    },
    onMouseDown: e => {
      setActive(true);
      props.onMouseDown?.(e);
    },
    onMouseUp: e => {
      setActive(false);
      props.onMouseUp?.(e);
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      width: size === 'icon' ? s.width : fullWidth ? '100%' : undefined,
      padding: s.padding,
      fontFamily: 'var(--font-sans)',
      fontSize: s.fontSize,
      fontWeight: 'var(--fw-medium)',
      letterSpacing: '-0.005em',
      lineHeight: 1,
      borderRadius: 'var(--radius-sm)',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      whiteSpace: 'nowrap',
      transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
      transform: active && !disabled ? 'scale(0.98)' : 'scale(1)',
      ...pal,
      ...style
    }
  }), loading ? /*#__PURE__*/React.createElement(Spinner, null) : leftIcon, children, !loading && rightIcon);
}
function Spinner() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: '50%',
      border: '2px solid rgba(255,255,255,0.35)',
      borderTopColor: '#fff',
      display: 'inline-block',
      animation: 'rf-spin 0.6s linear infinite'
    }
  });
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Base surface container. `surface-2` background, hairline border, 12px radius.
 * Pass `accentColor` for the signature left-border area card. `interactive`
 * adds hover elevation; `padding` controls inner spacing.
 */
function Card({
  accentColor,
  interactive = false,
  padding = 16,
  children,
  style = {},
  ...props
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({}, props, {
    onMouseEnter: e => {
      setHover(true);
      props.onMouseEnter?.(e);
    },
    onMouseLeave: e => {
      setHover(false);
      props.onMouseLeave?.(e);
    },
    style: {
      background: interactive && hover ? 'var(--surface-3)' : 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderLeft: accentColor ? `3px solid ${accentColor}` : '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding,
      transition: 'background var(--dur-base) var(--ease-out)',
      cursor: interactive ? 'pointer' : 'default',
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Custom rounded checkbox matching TaskItem. When `checked`, fills with `color`
 * (default accent) and shows a check; unchecked shows a 1.5px ring in `color`.
 */
function Checkbox({
  checked = false,
  onChange,
  color = 'var(--accent)',
  size = 20,
  disabled = false,
  ...props
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "checkbox",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => !disabled && onChange && onChange(!checked)
  }, props, {
    style: {
      width: size,
      height: size,
      flex: 'none',
      borderRadius: 'var(--radius-xs)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: checked ? disabled ? 'var(--text-disabled)' : color : 'transparent',
      border: checked ? 'none' : `1.5px solid ${disabled ? 'var(--text-disabled)' : color}`,
      transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
      opacity: disabled ? 0.5 : 1
    }
  }), checked && /*#__PURE__*/React.createElement("svg", {
    width: size * 0.6,
    height: size * 0.6,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input on a sunken surface. Focus shows accent ring. Supports `leftIcon`,
 * `invalid` state and standard input props.
 */
function Input({
  leftIcon = null,
  invalid = false,
  style = {},
  wrapperStyle = {},
  ...props
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 38,
      padding: leftIcon ? '0 12px 0 11px' : '0 12px',
      background: 'var(--surface-1)',
      border: `1px solid ${invalid ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-sm)',
      boxShadow: focus && !invalid ? '0 0 0 3px var(--accent-ring)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      ...wrapperStyle
    }
  }, leftIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-lo)',
      display: 'flex',
      flex: 'none'
    }
  }, leftIcon), /*#__PURE__*/React.createElement("input", _extends({}, props, {
    onFocus: e => {
      setFocus(true);
      props.onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      props.onBlur?.(e);
    },
    style: {
      flex: 1,
      minWidth: 0,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'var(--text-hi)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      ...style
    }
  })));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
/**
 * Thin progress bar. Defaults to a 3px accent track like the day/week headers.
 * Pass `color` to tint (e.g. an area color); `value` is 0–1.
 */
function ProgressBar({
  value = 0,
  color = 'var(--accent)',
  height = 3,
  style = {},
  trackStyle = {}
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      width: '100%',
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-3)',
      overflow: 'hidden',
      ...trackStyle
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${pct}%`,
      borderRadius: 'var(--radius-full)',
      background: color,
      transition: 'width var(--dur-bar) var(--ease-out)',
      ...style
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/core/SegmentedTabs.jsx
try { (() => {
/**
 * Segmented tabs (shadcn-style) on a sunken pill track. `tabs` is
 * [{ value, label }]; controlled via `value` / `onChange`.
 */
function SegmentedTabs({
  tabs = [],
  value,
  onChange,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'inline-flex',
      gap: 2,
      padding: 3,
      background: 'var(--surface-1)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      ...style
    }
  }, tabs.map(t => {
    const selected = t.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      role: "tab",
      "aria-selected": selected,
      onClick: () => onChange && onChange(t.value),
      style: {
        appearance: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '6px 14px',
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        fontWeight: 'var(--fw-medium)',
        borderRadius: 'var(--radius-sm)',
        background: selected ? 'var(--surface-3)' : 'transparent',
        color: selected ? 'var(--text-hi)' : 'var(--text-lo)',
        boxShadow: selected ? 'var(--shadow-sm)' : 'none',
        transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)'
      }
    }, t.label);
  }));
}
Object.assign(__ds_scope, { SegmentedTabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SegmentedTabs.jsx", error: String((e && e.message) || e) }); }

// components/routine/DateNavBar.jsx
try { (() => {
const DAY_LETTERS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

/**
 * Horizontal 7-day selector for the "Hoje" screen. `days` is an array of
 * { date, dayNum, weekday } where weekday is 0–6 (Sun–Sat); `selected` matches
 * a date string. Today gets an accent ring; selected fills accent.
 */
function DateNavBar({
  days = [],
  selected,
  today,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginBottom: 16
    }
  }, days.map(d => {
    const isSel = d.date === selected;
    const isToday = d.date === today;
    return /*#__PURE__*/React.createElement("button", {
      key: d.date,
      type: "button",
      onClick: () => onSelect && onSelect(d.date),
      style: {
        flex: 1,
        minWidth: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '9px 0',
        borderRadius: 'var(--radius-md)',
        background: isSel ? 'var(--accent)' : 'var(--surface-2)',
        border: `1px solid ${isToday && !isSel ? 'var(--accent-border)' : 'var(--border)'}`,
        cursor: 'pointer',
        transition: 'background var(--dur-fast) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 'var(--fw-semibold)',
        letterSpacing: '0.04em',
        color: isSel ? 'rgba(255,255,255,0.8)' : 'var(--text-lo)'
      }
    }, DAY_LETTERS[d.weekday]), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 15,
        fontWeight: 'var(--fw-semibold)',
        color: isSel ? '#fff' : isToday ? 'var(--accent)' : 'var(--text-hi)',
        fontFeatureSettings: 'var(--num-feature)'
      }
    }, d.dayNum));
  }));
}
Object.assign(__ds_scope, { DateNavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/routine/DateNavBar.jsx", error: String((e && e.message) || e) }); }

// components/routine/Heatmap.jsx
try { (() => {
/**
 * GitHub-style activity heatmap (Analytics). `days` is an array (chronological)
 * of { date, completionRate (0–1)|null, isFuture } — null/empty = no tasks.
 * Renders weeks as columns, weekdays as rows, with day labels and a legend.
 */
const CELL = 13;
const GAP = 3;
const DAY_LABELS = [{
  row: 0,
  label: 'Seg'
}, {
  row: 2,
  label: 'Qua'
}, {
  row: 4,
  label: 'Sex'
}, {
  row: 6,
  label: 'Dom'
}];
function cellColor(d) {
  if (!d || d.isFuture) return 'var(--surface-1)';
  if (d.completionRate == null) return '#1C1C1E';
  if (d.completionRate === 0) return '#1F2A20';
  if (d.completionRate < 0.34) return 'rgba(47,139,255,0.28)';
  if (d.completionRate < 0.67) return 'rgba(47,139,255,0.58)';
  return 'var(--accent)';
}
function Heatmap({
  days = [],
  showLegend = true
}) {
  const weeks = Math.ceil(days.length / 7) || 1;
  const transposed = [];
  for (let r = 0; r < 7; r++) {
    for (let w = 0; w < weeks; w++) {
      const item = days[w * 7 + r];
      if (item) transposed.push(item);
    }
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateRows: `repeat(7, ${CELL}px)`,
      gap: GAP,
      flex: 'none'
    }
  }, Array.from({
    length: 7
  }, (_, row) => {
    const cfg = DAY_LABELS.find(c => c.row === row);
    return /*#__PURE__*/React.createElement("div", {
      key: row,
      style: {
        height: CELL,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }
    }, cfg && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: 'var(--text-lo)',
        lineHeight: 1,
        paddingRight: 4
      }
    }, cfg.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(7, ${CELL}px)`,
      gap: GAP,
      flex: 1,
      minWidth: 0
    }
  }, transposed.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    title: d.date,
    style: {
      height: CELL,
      borderRadius: 2,
      background: cellColor(d)
    }
  })))), showLegend && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 10,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: 'var(--text-lo)'
    }
  }, "Menos"), ['#1C1C1E', 'rgba(47,139,255,0.28)', 'rgba(47,139,255,0.58)', 'var(--accent)'].map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: c
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: 'var(--text-lo)'
    }
  }, "Mais")));
}
Object.assign(__ds_scope, { Heatmap });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/routine/Heatmap.jsx", error: String((e && e.message) || e) }); }

// components/routine/StreakCard.jsx
try { (() => {
/**
 * Streak summary card (Analytics). Left-border in the area color, icon, area
 * name + last-active, big mono streak number, chevron. Interactive.
 */
function StreakCard({
  areaName,
  icon,
  color = 'var(--accent)',
  currentStreak = 0,
  lastActiveLabel,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    role: "button",
    tabIndex: 0,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '15px 16px',
      background: hover ? 'var(--surface-3)' : 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderLeft: `3px solid ${color}`,
      borderRadius: 'var(--radius-lg)',
      cursor: 'pointer',
      transition: 'background var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      flex: 'none',
      lineHeight: 1
    },
    "aria-hidden": true
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-hi)',
      fontWeight: 'var(--fw-medium)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, areaName), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 0',
      fontSize: 'var(--fs-micro)',
      color: 'var(--text-dim)'
    }
  }, lastActiveLabel ? `Ativo em ${lastActiveLabel}` : 'Sem atividade')), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-mono)',
      fontSize: 26,
      fontWeight: 'var(--fw-semibold)',
      lineHeight: 1,
      color,
      letterSpacing: '-0.02em',
      fontFeatureSettings: 'var(--num-feature)'
    }
  }, currentStreak), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '3px 0 0',
      fontSize: 'var(--fs-micro)',
      color: 'var(--text-lo)'
    }
  }, "dias")), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-dim)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "m9 18 6-6-6-6"
  })));
}
Object.assign(__ds_scope, { StreakCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/routine/StreakCard.jsx", error: String((e && e.message) || e) }); }

// components/routine/TaskItem.jsx
try { (() => {
/**
 * A single task row inside an AreaCard. Custom checkbox tinted to the area color,
 * title that strikes through when done, optional time pill and description.
 */
function TaskItem({
  title,
  description,
  estimatedMinutes,
  completed = false,
  areaColor = 'var(--accent)',
  onToggle,
  isLast = false,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: '12px 0',
      borderBottom: isLast ? 'none' : '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    checked: completed,
    onChange: onToggle,
    color: areaColor,
    size: 20,
    disabled: disabled
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-h3)',
      fontWeight: 'var(--fw-medium)',
      lineHeight: 1.35,
      letterSpacing: 'var(--tr-h3)',
      textDecoration: completed ? 'line-through' : 'none',
      color: completed ? 'var(--text-lo)' : 'var(--text-hi)',
      transition: 'color var(--dur-base) var(--ease-out)'
    }
  }, title), estimatedMinutes != null && estimatedMinutes > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--text-lo)',
      background: 'var(--surface-3)',
      padding: '2px 8px',
      borderRadius: 'var(--radius-full)',
      fontFeatureSettings: 'var(--num-feature)'
    }
  }, estimatedMinutes, " min")), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '3px 0 0',
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-lo)',
      lineHeight: 1.5
    }
  }, description)));
}
Object.assign(__ds_scope, { TaskItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/routine/TaskItem.jsx", error: String((e && e.message) || e) }); }

// components/routine/AreaCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Collapsible area card — the core building block of the "Hoje" screen.
 * Signature 3px left border in the area color, header with icon + name + count
 * + mini progress bar + chevron, and an expandable task list.
 */
function AreaCard({
  name,
  icon,
  color = 'var(--accent)',
  tasks = [],
  onTaskToggle,
  defaultExpanded,
  disabled = false
}) {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const rate = total > 0 ? done / total : 0;
  const [expanded, setExpanded] = React.useState(defaultExpanded != null ? defaultExpanded : rate < 1);
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderLeft: `3px solid ${color}`,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setExpanded(v => !v),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-expanded": expanded,
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      textAlign: 'left',
      background: hover ? 'var(--surface-3)' : 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'background var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      flex: 'none',
      lineHeight: 1
    },
    "aria-hidden": true
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-h3)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-hi)',
      letterSpacing: 'var(--tr-h3)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-lo)',
      fontFeatureSettings: 'var(--num-feature)'
    }
  }, done, "/", total), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 6,
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-1)',
      overflow: 'hidden',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${rate * 100}%`,
      background: color,
      borderRadius: 'var(--radius-full)',
      transition: 'width var(--dur-bar) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-lo)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: 'none',
      transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: expanded ? 600 : 0,
      overflow: 'hidden',
      transition: 'max-height var(--dur-slow) var(--ease-in-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 4px'
    }
  }, tasks.map((task, i) => /*#__PURE__*/React.createElement(__ds_scope.TaskItem, _extends({
    key: task.id != null ? task.id : i
  }, task, {
    areaColor: color,
    isLast: i === tasks.length - 1,
    disabled: disabled,
    onToggle: next => onTaskToggle && onTaskToggle(task.id != null ? task.id : i, next)
  }))))), rate === 1 && !expanded && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      padding: '0 16px 12px',
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-lo)'
    }
  }, "\u2713 \xC1rea conclu\xEDda"));
}
Object.assign(__ds_scope, { AreaCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/routine/AreaCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/routineflow/App.jsx
try { (() => {
/* RoutineFlow app shell — desktop sidebar + scrollable main column.
 * Switches between the five product screens. */
const {
  Icon
} = window;
const NAV = [{
  id: 'today',
  icon: 'home',
  label: 'Hoje'
}, {
  id: 'tasks',
  icon: 'checkSquare',
  label: 'Tarefas'
}, {
  id: 'week',
  icon: 'calendar',
  label: 'Semana'
}, {
  id: 'analytics',
  icon: 'barChart',
  label: 'Analytics'
}, {
  id: 'manage',
  icon: 'settings',
  label: 'Gerenciar'
}, {
  id: 'import',
  icon: 'upload',
  label: 'Importar'
}];
function SidebarItem({
  item,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 12px',
      borderRadius: 'var(--radius-sm)',
      fontSize: 14,
      fontWeight: active ? 'var(--fw-medium)' : 'var(--fw-regular)',
      cursor: 'pointer',
      border: 'none',
      textAlign: 'left',
      width: '100%',
      background: active ? 'var(--surface-3)' : hover ? 'var(--surface-2)' : 'transparent',
      color: active || hover ? 'var(--text-hi)' : 'var(--text-lo)',
      transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: item.icon,
    size: 16
  }), item.label);
}
function App() {
  const [screen, setScreen] = React.useState('today');
  const Screens = window;
  const map = {
    today: Screens.TodayScreen,
    tasks: Screens.TasksScreen,
    week: Screens.WeekScreen,
    analytics: Screens.AnalyticsScreen,
    manage: Screens.ManageScreen
  };
  const Current = map[screen] || Screens.TodayScreen;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100vh',
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 220,
      flex: 'none',
      borderRight: '1px solid var(--border)',
      height: '100%',
      padding: '24px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '0 12px',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/favicon.svg",
    alt: "",
    style: {
      width: 22,
      height: 22
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: 'var(--text-hi)'
    }
  }, "RoutineFlow")), NAV.map(item => /*#__PURE__*/React.createElement(SidebarItem, {
    key: item.id,
    item: item,
    active: screen === item.id,
    onClick: () => setScreen(item.id === 'import' ? 'today' : item.id)
  }))), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    key: screen,
    className: "rf-fade",
    style: {
      maxWidth: 768,
      margin: '0 auto',
      padding: '36px 36px 64px'
    }
  }, /*#__PURE__*/React.createElement(Current, null))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/routineflow/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/routineflow/Icons.jsx
try { (() => {
/* Lucide icon glyphs (the codebase's icon system, lucide-react) reproduced as
 * inline SVG so the kit is self-contained. Stroke 2, 24×24, currentColor. */
const PATHS = {
  home: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"
  })),
  checkSquare: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
    points: "9 11 12 14 22 4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
  })),
  calendar: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 2v4M8 2v4M3 10h18"
  })),
  barChart: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "20",
    x2: "6",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "20",
    x2: "12",
    y2: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "20",
    x2: "18",
    y2: "10"
  })),
  settings: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "7",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "17",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 7h9M4 17h9"
  })),
  upload: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 8 12 3 17 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 3v12"
  })),
  plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M12 5v14"
  })),
  chevronDown: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })),
  chevronRight: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "m9 18 6-6-6-6"
  })),
  chevronLeft: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "m15 18-6-6 6-6"
  })),
  download: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 10 12 15 17 10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 15V3"
  })),
  search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })),
  bell: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
  })),
  x: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  })),
  pencil: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 20h9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"
  })),
  trash: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "11",
    x2: "10",
    y2: "17"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "14",
    y1: "11",
    x2: "14",
    y2: "17"
  })),
  arrowLeft: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "m12 19-7-7 7-7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5"
  }))
};
function Icon({
  name,
  size = 18,
  color = 'currentColor',
  strokeWidth = 2,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'block',
      flex: 'none',
      ...style
    }
  }, PATHS[name] || null);
}
Object.assign(window, {
  Icon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/routineflow/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/routineflow/data.js
try { (() => {
/* Sample routine data for the RoutineFlow kit. Mirrors the real domain:
 * areas → tasks, single tasks, streaks, week grid, activity heatmap. */
const C = v => `var(--area-${v})`;
const AREAS = [{
  id: 1,
  name: 'Saúde & Treino',
  icon: '🏃',
  color: C('red'),
  tasks: [{
    id: 11,
    title: 'Treino de força',
    estimatedMinutes: 45,
    completed: true
  }, {
    id: 12,
    title: 'Alongamento matinal',
    estimatedMinutes: 10,
    completed: true
  }, {
    id: 13,
    title: 'Caminhada',
    description: '30 min ao ar livre',
    estimatedMinutes: 30,
    completed: false
  }]
}, {
  id: 2,
  name: 'Estudo · Inglês/PTE',
  icon: '📚',
  color: C('indigo'),
  tasks: [{
    id: 21,
    title: 'Re-tell Lecture',
    description: '5 áudios de prática',
    estimatedMinutes: 25,
    completed: true
  }, {
    id: 22,
    title: 'Read Aloud',
    estimatedMinutes: 20,
    completed: false
  }, {
    id: 23,
    title: 'Vocabulário — 15 cartões',
    estimatedMinutes: 15,
    completed: false
  }]
}, {
  id: 3,
  name: 'Trabalho profundo',
  icon: '💻',
  color: C('blue'),
  tasks: [{
    id: 31,
    title: 'Bloco de foco — API',
    estimatedMinutes: 90,
    completed: false
  }, {
    id: 32,
    title: 'Revisar PRs',
    estimatedMinutes: 30,
    completed: false
  }]
}, {
  id: 4,
  name: 'Mente & Leitura',
  icon: '🧘',
  color: C('green'),
  tasks: [{
    id: 41,
    title: 'Meditar',
    estimatedMinutes: 10,
    completed: true
  }, {
    id: 42,
    title: 'Ler 20 páginas',
    description: 'Antes de dormir',
    estimatedMinutes: 20,
    completed: false
  }]
}];
const SINGLE_TASKS = [{
  id: 101,
  title: 'Renovar passaporte',
  due: 'Hoje',
  overdue: false,
  completed: false
}, {
  id: 102,
  title: 'Responder e-mail do orientador',
  due: 'Atrasada',
  overdue: true,
  completed: false
}, {
  id: 103,
  title: 'Comprar presente',
  due: 'Sex, 20 jun',
  overdue: false,
  completed: false
}, {
  id: 104,
  title: 'Agendar dentista',
  due: null,
  overdue: false,
  completed: false
}];
const STREAKS = [{
  areaId: 1,
  areaName: 'Saúde & Treino',
  icon: '🏃',
  color: C('red'),
  currentStreak: 14,
  lastActiveLabel: '18 jun'
}, {
  areaId: 2,
  areaName: 'Estudo · Inglês/PTE',
  icon: '📚',
  color: C('indigo'),
  currentStreak: 9,
  lastActiveLabel: '18 jun'
}, {
  areaId: 4,
  areaName: 'Mente & Leitura',
  icon: '🧘',
  color: C('green'),
  currentStreak: 7,
  lastActiveLabel: '17 jun'
}, {
  areaId: 3,
  areaName: 'Trabalho profundo',
  icon: '💻',
  color: C('blue'),
  currentStreak: 3,
  lastActiveLabel: '16 jun'
}];

// week grid: per-area scheduled days (0=Mon..6=Sun) + weekly rate
const WEEK_ROWS = [{
  areaId: 1,
  name: 'Saúde & Treino',
  icon: '🏃',
  color: C('red'),
  rate: 0.82,
  done: 9,
  total: 11,
  days: [1, 1, 1, 1, 1, 1, 0]
}, {
  areaId: 2,
  name: 'Estudo · Inglês/PTE',
  icon: '📚',
  color: C('indigo'),
  rate: 0.6,
  done: 6,
  total: 10,
  days: [1, 1, 1, 1, 1, 0, 0]
}, {
  areaId: 3,
  name: 'Trabalho profundo',
  icon: '💻',
  color: C('blue'),
  rate: 0.45,
  done: 5,
  total: 11,
  days: [1, 1, 1, 1, 1, 0, 0]
}, {
  areaId: 4,
  name: 'Mente & Leitura',
  icon: '🧘',
  color: C('green'),
  rate: 0.93,
  done: 13,
  total: 14,
  days: [1, 1, 1, 1, 1, 1, 1]
}];

// activity heatmap — 13 weeks of pseudo data (deterministic)
function buildHeatmap() {
  const days = [];
  const today = new Date();
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 90; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const r = rnd();
    days.push({
      date: d.toISOString().slice(0, 10),
      completionRate: r < 0.16 ? null : Math.min(1, r * 1.15)
    });
  }
  return days;
}
const HEATMAP = buildHeatmap();
const WEEK_HISTORY = [{
  label: 'S1',
  rate: 52
}, {
  label: 'S2',
  rate: 61
}, {
  label: 'S3',
  rate: 48
}, {
  label: 'S4',
  rate: 70
}, {
  label: 'S5',
  rate: 66
}, {
  label: 'S6',
  rate: 78
}, {
  label: 'S7',
  rate: 64
}, {
  label: 'S8',
  rate: 81
}];

// current week for DateNavBar
function buildWeek() {
  const today = new Date();
  const week = [];
  const monday = new Date(today);
  monday.setDate(today.getDate() - (today.getDay() + 6) % 7);
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    week.push({
      date: d.toISOString().slice(0, 10),
      dayNum: d.getDate(),
      weekday: (i + 1) % 7
    });
  }
  return week;
}
const WEEK_DAYS = buildWeek();
const TODAY_STR = new Date().toISOString().slice(0, 10);
const TODAY_LABEL = (() => {
  const s = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date());
  return s.charAt(0).toUpperCase() + s.slice(1);
})();
Object.assign(window, {
  RF_DATA: {
    AREAS,
    SINGLE_TASKS,
    STREAKS,
    WEEK_ROWS,
    HEATMAP,
    WEEK_HISTORY,
    WEEK_DAYS,
    TODAY_STR,
    TODAY_LABEL
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/routineflow/data.js", error: String((e && e.message) || e) }); }

// ui_kits/routineflow/screens.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* RoutineFlow UI kit — the five product screens, composed from the design
 * system components. Hi-fi recreations of the real app views. */
const DS = window.RoutineFlowDesignSystem_8e3ffe;
const {
  Button,
  Badge,
  Input,
  Checkbox,
  SegmentedTabs,
  AreaCard,
  StreakCard,
  DateNavBar,
  Heatmap
} = DS;
const {
  Icon
} = window;
const label = {
  fontSize: 'var(--fs-label)',
  fontWeight: 'var(--fw-semibold)',
  letterSpacing: 'var(--tr-label)',
  textTransform: 'uppercase',
  color: 'var(--text-lo)'
};
const pageTitle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--fs-display)',
  fontWeight: 'var(--fw-light)',
  letterSpacing: 'var(--tr-display)',
  color: 'var(--text-hi)',
  margin: 0
};
const subtle = {
  fontSize: 'var(--fs-sm)',
  color: 'var(--text-lo)',
  margin: '4px 0 0'
};
const mono = {
  fontFamily: 'var(--font-mono)',
  fontFeatureSettings: 'var(--num-feature)'
};

// ── HOJE ──────────────────────────────────────────────────────────────────────
function TodayScreen() {
  const D = window.RF_DATA;
  const [areas, setAreas] = React.useState(D.AREAS);
  const [sel, setSel] = React.useState(D.TODAY_STR);
  const toggle = areaId => (taskId, done) => setAreas(as => as.map(a => a.id !== areaId ? a : {
    ...a,
    tasks: a.tasks.map(t => t.id === taskId ? {
      ...t,
      completed: done
    } : t)
  }));
  const all = areas.flatMap(a => a.tasks);
  const done = all.filter(t => t.completed).length;
  const rate = all.length ? done / all.length : 0;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DateNavBar, {
    days: D.WEEK_DAYS,
    selected: sel,
    today: D.TODAY_STR,
    onSelect: setSel
  }), /*#__PURE__*/React.createElement("header", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: pageTitle
  }, D.TODAY_LABEL), /*#__PURE__*/React.createElement("p", {
    style: subtle
  }, done, " de ", all.length, " tarefas \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: mono
  }, Math.round(rate * 100), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      height: 3,
      borderRadius: 99,
      background: 'var(--surface-3)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${rate * 100}%`,
      background: 'var(--accent)',
      borderRadius: 99,
      transition: 'width var(--dur-bar) var(--ease-out)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, areas.map(a => /*#__PURE__*/React.createElement(AreaCard, _extends({
    key: a.id
  }, a, {
    onTaskToggle: toggle(a.id)
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...label,
      fontSize: 13,
      textTransform: 'none',
      letterSpacing: 0,
      color: 'var(--text-hi)'
    }
  }, "Para fazer"), /*#__PURE__*/React.createElement(Badge, null, D.SINGLE_TASKS.length)), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    size: "sm",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    })
  }, "Adicionar")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '0 16px'
    }
  }, D.SINGLE_TASKS.map((t, i) => /*#__PURE__*/React.createElement(SingleRow, {
    key: t.id,
    task: t,
    isLast: i === D.SINGLE_TASKS.length - 1
  })))));
}
function SingleRow({
  task,
  isLast,
  archived
}) {
  const [done, setDone] = React.useState(task.completed || archived);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '13px 0',
      borderBottom: isLast ? 'none' : '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: done,
    onChange: setDone,
    color: "var(--accent)",
    size: 19
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body)',
      color: done ? 'var(--text-lo)' : 'var(--text-hi)',
      textDecoration: done ? 'line-through' : 'none'
    }
  }, task.title)), task.due && /*#__PURE__*/React.createElement(Badge, {
    variant: task.overdue ? 'danger' : 'neutral',
    dot: task.overdue
  }, task.due));
}

// ── TAREFAS ─────────────────────────────────────────────────────────────────
function TasksScreen() {
  const D = window.RF_DATA;
  const [tab, setTab] = React.useState('pending');
  const [filter, setFilter] = React.useState(null);
  const filters = [['OVERDUE', 'Atrasadas'], ['TODAY', 'Hoje'], ['FUTURE', 'Futuras'], ['NO_DATE', 'Sem prazo']];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: pageTitle
  }, "Tarefas"), /*#__PURE__*/React.createElement("p", {
    style: subtle
  }, D.SINGLE_TASKS.length, " pendentes")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    })
  }, "Nova tarefa")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(SegmentedTabs, {
    value: tab,
    onChange: setTab,
    tabs: [{
      value: 'pending',
      label: 'Pendentes'
    }, {
      value: 'archived',
      label: 'Arquivadas'
    }]
  })), tab === 'pending' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7,
      flexWrap: 'wrap',
      marginBottom: 16
    }
  }, filters.map(([v, l]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setFilter(filter === v ? null : v),
    style: {
      cursor: 'pointer',
      fontSize: 12,
      fontWeight: 500,
      padding: '5px 12px',
      borderRadius: 999,
      background: filter === v ? 'var(--accent-bg)' : 'var(--surface-2)',
      color: filter === v ? 'var(--accent)' : 'var(--text-lo)',
      border: `1px solid ${filter === v ? 'var(--accent-border)' : 'var(--border)'}`
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '0 16px'
    }
  }, (tab === 'pending' ? D.SINGLE_TASKS : D.SINGLE_TASKS.slice(0, 2)).map((t, i, arr) => /*#__PURE__*/React.createElement(SingleRow, {
    key: t.id,
    task: t,
    isLast: i === arr.length - 1,
    archived: tab === 'archived'
  }))));
}

// ── SEMANA ──────────────────────────────────────────────────────────────────
function WeekScreen() {
  const D = window.RF_DATA;
  const DAY_L = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  const todayIdx = (new Date().getDay() + 6) % 7;
  const overall = Math.round(D.WEEK_ROWS.reduce((s, r) => s + r.rate, 0) / D.WEEK_ROWS.length * 100);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("header", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: pageTitle
  }, "Semana"), /*#__PURE__*/React.createElement("p", {
    style: subtle
  }, "16 \u2013 22 jun \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: mono
  }, overall, "%"), " geral"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      height: 3,
      borderRadius: 99,
      background: 'var(--surface-3)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${overall}%`,
      background: 'var(--accent)',
      borderRadius: 99
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 168,
      flex: 'none',
      padding: '12px 16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...label,
      fontSize: 11
    }
  }, "\xC1rea")), DAY_L.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      textAlign: 'center',
      padding: '12px 0',
      background: i === todayIdx ? 'rgba(47,139,255,0.06)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: i === todayIdx ? 'var(--accent)' : 'var(--text-lo)'
    }
  }, d)))), D.WEEK_ROWS.map((row, ri) => /*#__PURE__*/React.createElement("div", {
    key: row.areaId,
    style: {
      display: 'flex',
      alignItems: 'stretch',
      borderBottom: ri === D.WEEK_ROWS.length - 1 ? 'none' : '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 168,
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '10px 16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, row.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--text-hi)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, row.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 10,
      color: 'var(--text-lo)',
      ...mono
    }
  }, row.done, "/", row.total, " \xB7 ", Math.round(row.rate * 100), "%"))), row.days.map((sched, di) => /*#__PURE__*/React.createElement("div", {
    key: di,
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      background: di === todayIdx ? 'rgba(47,139,255,0.06)' : 'transparent'
    }
  }, sched ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: row.color,
      opacity: Math.max(0.22, row.rate)
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-disabled)'
    }
  }, "\xB7")))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 10,
      color: 'var(--text-lo)',
      marginTop: 12,
      textAlign: 'right'
    }
  }, "Opacidade dos c\xEDrculos reflete a taxa de conclus\xE3o semanal da \xE1rea"));
}

// ── ANALYTICS ─────────────────────────────────────────────────────────────────
function AnalyticsScreen() {
  const D = window.RF_DATA;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 30
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: pageTitle
  }, "Analytics"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 14
    })
  }, "Exportar CSV")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...label,
      marginBottom: 12
    }
  }, "Sequ\xEAncias"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, D.STREAKS.map(s => /*#__PURE__*/React.createElement(StreakCard, _extends({
    key: s.areaId
  }, s))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...label,
      marginBottom: 12
    }
  }, "Hist\xF3rico de atividade"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 16
    }
  }, /*#__PURE__*/React.createElement(Heatmap, {
    days: D.HEATMAP
  }))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...label,
      marginBottom: 12
    }
  }, "Progresso semanal"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 16
    }
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: D.WEEK_HISTORY
  }))));
}
function LineChart({
  data
}) {
  const W = 560,
    H = 170,
    pad = 28;
  const max = 100;
  const x = i => pad + i / (data.length - 1) * (W - pad * 2);
  const y = v => H - pad - v / max * (H - pad * 2);
  const pts = data.map((d, i) => `${x(i)},${y(d.rate)}`).join(' ');
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    style: {
      width: '100%',
      height: 'auto',
      display: 'block'
    }
  }, [0, 25, 50, 75, 100].map(g => /*#__PURE__*/React.createElement("g", {
    key: g
  }, /*#__PURE__*/React.createElement("line", {
    x1: pad,
    y1: y(g),
    x2: W - pad,
    y2: y(g),
    stroke: "var(--border-subtle)",
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement("text", {
    x: 4,
    y: y(g) + 3,
    fill: "var(--text-lo)",
    fontSize: "10",
    fontFamily: "var(--font-mono)"
  }, g))), /*#__PURE__*/React.createElement("polyline", {
    points: pts,
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), data.map((d, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: x(i),
    cy: y(d.rate),
    r: "3",
    fill: "var(--accent)"
  })), data.map((d, i) => /*#__PURE__*/React.createElement("text", {
    key: i,
    x: x(i),
    y: H - 8,
    textAnchor: "middle",
    fill: "var(--text-lo)",
    fontSize: "10"
  }, d.label)));
}

// ── GERENCIAR ─────────────────────────────────────────────────────────────────
function ManageScreen() {
  const D = window.RF_DATA;
  const [selId, setSelId] = React.useState(D.AREAS[1].id);
  const sel = D.AREAS.find(a => a.id === selId);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...pageTitle,
      fontSize: 'var(--fs-h2)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--tr-h2)'
    }
  }, "Gerenciar Rotina"), /*#__PURE__*/React.createElement("p", {
    style: subtle
  }, "Adicione, edite ou remova \xE1reas e tarefas da sua rotina.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '264px 1fr',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: label
  }, "\xC1reas"), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    size: "sm",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 13
    })
  }, "Nova \xC1rea")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, D.AREAS.map(a => /*#__PURE__*/React.createElement(AreaManageRow, {
    key: a.id,
    area: a,
    selected: a.id === selId,
    onSelect: () => setSelId(a.id)
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      border: `2px solid ${sel.color}`
    }
  }, sel.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-hi)'
    }
  }, sel.name)), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    size: "sm",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 13
    })
  }, "Nova Tarefa")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...label,
      fontSize: 10,
      marginBottom: 6,
      paddingLeft: 4
    }
  }, "Di\xE1rias"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, sel.tasks.map(t => /*#__PURE__*/React.createElement(TaskManageRow, {
    key: t.id,
    task: t,
    color: sel.color
  }))))));
}
function AreaManageRow({
  area,
  selected,
  onSelect
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onSelect,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '10px 12px',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      background: selected ? 'var(--surface-3)' : hover ? 'var(--surface-2)' : 'transparent',
      transition: 'background var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      flex: 'none',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      border: `2px solid ${area.color}`
    }
  }, area.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-hi)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, area.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--text-lo)',
      flex: 'none',
      ...mono
    }
  }, area.tasks.length, " tarefas"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 14,
    color: selected ? 'var(--accent)' : 'var(--text-dim)'
  }));
}
function TaskManageRow({
  task,
  color
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '11px 12px',
      borderRadius: 'var(--radius-md)',
      background: hover ? 'var(--surface-2)' : 'transparent',
      transition: 'background var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      flex: 'none',
      background: color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      color: 'var(--text-hi)'
    }
  }, task.title), task.estimatedMinutes && /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontSize: 11,
      color: 'var(--text-lo)',
      background: 'var(--surface-3)',
      padding: '2px 8px',
      borderRadius: 999
    }
  }, task.estimatedMinutes, " min"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2,
      opacity: hover ? 1 : 0,
      transition: 'opacity var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: iconBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pencil",
    size: 13,
    color: "var(--text-lo)"
  })), /*#__PURE__*/React.createElement("button", {
    style: iconBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 13,
    color: "var(--text-lo)"
  }))));
}
const iconBtn = {
  display: 'flex',
  padding: 6,
  borderRadius: 8,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer'
};
Object.assign(window, {
  TodayScreen,
  TasksScreen,
  WeekScreen,
  AnalyticsScreen,
  ManageScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/routineflow/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.SegmentedTabs = __ds_scope.SegmentedTabs;

__ds_ns.AreaCard = __ds_scope.AreaCard;

__ds_ns.DateNavBar = __ds_scope.DateNavBar;

__ds_ns.Heatmap = __ds_scope.Heatmap;

__ds_ns.StreakCard = __ds_scope.StreakCard;

__ds_ns.TaskItem = __ds_scope.TaskItem;

})();
