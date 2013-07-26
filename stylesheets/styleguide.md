# Rapido Framework

## Intro

An easy and quick [**Sass**](http://sass-lang.com/) + [**Compass**](http://compass-style.org/) + [**Susy**](http://susy.oddbird.net/) + [**OOCSS**](http://oocss.org/) + [**BEM**](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) prototyping framework based on Bootstrap without all the default styles.

## Features

* Most of the modules from Boostrap (some heavily modified and streamlined)
* **CSS architecture and styling completely separated**, creating and switching complex themes is much easier
* **Every unused component can be disabled** to slim the final css
* All sizes are in **em** and respect the **vertical rhythm** of the page
* **Super easy responsive layouts** with Susy and custom mixins
* Full support of **automatic sprite generation** (with Compass)
* Full support of **icon fonts** with 8 fonts already included and custom mixin to remove any frictions
* Complete set of **css animations** with custom mixin
* There is a variable for almost everything

## Why?

The Rapido framework, is the result of a couple of months trying to figure out a way to incorporate a common framework in all my front-end projects, both for personal and client works. I started to look around at complete frameworks for quick prototyping and found three: [**Bootstrap**](https://github.com/twitter/bootstrap), [**Foundation**](https://github.com/zurb/foundation) and [**Inuit**](https://github.com/csswizardry/inuit.css). The first two are very similar, Bootstrap has more features that i never use so they where basically the same for me, Inuit is much smaller and more object oriented (ex: [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) naming syntax).

The problem was that after the first prototypes they where very difficult to tame and style like I wanted (and please, bootswatch.com and wrapbootstrap.com doesn't count, I mean real full designs). So I wanted to create a frankestein's framework with all the useful components from bootstrap, everything in variables like Foundation and the easy styling of Inuit.

I started taking off all the unnecessary bits from bootstrap, adding inuit variables and naming conventions and I was pretty happy with it, but then I started refactoring all the code, adding susy grids, structuring the files in a different way, cleaning all the unnecessary hacks for retro-compatibility, adding a bunch of useful mixing, and so on… so after all of this I thought that it may be useful for others.

#### Feedbacks

It was (and still is) made for my personal use so some stuff may seems strange but this is how I work, maybe with your help we can make it better, if you find a better solution of somethign covered in the framework please contact me and we'll se if it can work.

## Notes

This documentation is not meant for everyone, I've taken heavily from Bootstrap documentation for all common components that share the same characteristics and some parts are barebones because are meant to be a reference to other front-end developers that already know how Bootstrap (and css frameworks in general) work.
