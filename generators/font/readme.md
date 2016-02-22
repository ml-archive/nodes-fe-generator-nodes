# nodes:font

Creates a folder in which you can place a set of webfonts in, and imports the fonts as `@fontface` in the _fonts.scss file.
You only need to provide the filename of the fonts you are trying to load with `@fontface`, the generator takes care of appending
file extensions.

We expect the fonts are available with the following file extensions:
- .eot
- .woff
- .ttf
- .svg

But you can always update the `@import` statement to suit your needs.