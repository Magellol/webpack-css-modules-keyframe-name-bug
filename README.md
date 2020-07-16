```bash
./test.sh
```

https://github.com/css-modules/postcss-modules-values/blob/de45a53227a798f70b5b2342ed3c4ca594c8f552/test/index.js#L72-L84
https://github.com/css-modules/postcss-modules-values/blob/de45a53227a798f70b5b2342ed3c4ca594c8f552/src/index.js#L15

https://github.com/css-modules/postcss-modules-local-by-default/pull/13
https://github.com/css-modules/postcss-modules-local-by-default/commit/ff9580a46215927f26b4baf5e7cc6e392a8ce0a3

## input to `postcss-modules-scope`

### css-loader v2

```css
:import("../styles.css") {
  i__const_animation_0: animation;
}
:export {
  animation: :local(i__const_animation_0);
}
:local(.topApplicationPlaceholder) {
  composes: i__const_animation_0;
}
```

### css-loader v3

```css
:import("../styles.css") {
  i__const_animation_0: animation;
}
:export {
  animation: i__const_animation_0;
}
:local(.topApplicationPlaceholder) {
  composes: i__const_animation_0;
}
```