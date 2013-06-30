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

This documentation is not mean for everyone, I've taken heavy from Bootstrap documentation for all common components that share the same characteristics and some parts are barebones because is meant to be a reference to other front-end developers that already know how Bootstrap (and css frameworks in general) work.

## Components

### Alerts

Wrap any text and an optional dismiss button in `.alert` for a basic warning alert message.

    <div class="alert">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>Alert!</strong> Best check yourself, you're not looking too good.
    </div>
    
#### Alert Block

For longer messages, increase the padding on the top and bottom of the alert wrapper by adding `.alert-block`.

    <div class="alert alert--block">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>Error</strong>
      <p>The field Number is required and must contain a value.</p>
      <p>The field Product Title is required and must contain a value.</p>
      <p>The field Total Expenses is required and must contain a value.</p>
    </div>


### Breadcrumbs

Add a breadcrumb with a list with class `.breadcrumb`.

	<ul class="breadcrumb">
	  <li><a href="#">Home</a></li>
	  <li><a href="#">Library</a></li>
	  <li class="active">Data</li>
	</ul>
	
#### States	

* `.active`: Selected element style
    
### Buttons


Button styles can be applied to anything with the `.btn` class applied. However, typically you'll want to apply these to only `<a>` and `<button>` elements for the best rendering. 

	<a href="#" class="btn">Button</a>   
	<button class="btn">Button</button>   
    
#### Modifiers

**Colors**

* `.btn--primary`
* `.btn--secondary`
* `.btn--warning`
* `.btn--danger`
* `.btn--info`
* `.btn--success`
* `.btn--inverse`
        
**Sizes**

* `.btn--large`
* `.btn--small`
* `.btn--mini`

**Various**

* `.btn--block`: Create block level buttons—those that span the full width of a parent.
* `.btn--pill`: Button width rounded full corners.
* `.btn--link`: Deemphasize a button by making it look like a link while maintaining button behavior.
			
#### States

* `.hover`: Mouse hover state style
* `.active`: Selected element style
* `.disabled`: Disabled state style.

### Button-groups

Wrap a series of buttons with `.btn` in `.btn-group`.

    <ul class="btn-group">
      <li><button class="btn">Left</button></li>
      <li><button class="btn">Middle</button></li>
      <li><button class="btn">Right</button></li>
    </ul>
    

### Captions

  You can use: `top`, `right`, `bottom`, `left`, `topleft`, `topright`, `bottomright`, `bottomleft`.

    <figure class="caption--bottomleft" data-content="Caption text.">
      <img src="http://dummyimage.com/300x200/afe600/fff" />
    </figure>

#### Animations

**Float**

Add fade slide animation form `top` or `bottom`.

*Example below*: Float from top

    <figure class="caption--float-top" data-content="Caption text.">
      <img src="http://dummyimage.com/300x200/afe600/fff" />
    </figure>

**Fade**

*Example below*: Fade from bottom

    <figure class="caption--fade-bottom" data-content="Caption text.">
      <img src="http://dummyimage.com/300x200/afe600/fff" />
    </figure>    

### Close

Link

    <a href="#" class="close">&times;</button>

Button

    <button type="button" class="close">&times;</button>
    
### Dropdowns

Toggleable, contextual menu for displaying lists of links. 

Made interactive with the [dropdown JavaScript plugin](http://twitter.github.io/bootstrap/javascript.html#dropdowns).

Looking at just the dropdown menu, here's the required HTML. You need to wrap the dropdown's trigger and the dropdown menu within `.dropdown`. Then just create the menu.

    <div class="dropdown">
        <a href="#" class="btn dropdown__toggle " data-toggle="dropdown">
          Dropdown
          <span class="dropdown__caret"></span>
        </a>
        <ul class="dropdown__menu ">
        <li><a tabindex="-1" href="#">Action</a></li>
        <li><a tabindex="-1" href="#">Another action</a></li>
        <li><a tabindex="-1" href="#">Something else here</a></li>
        <li class="divider"></li>
        <li><a tabindex="-1" href="#">Separated link</a></li>
        </ul>
    </div>

#### Elements

* `.dropdown__toggle`: The linkk or button to openthe dropdown
* `.dropdown__caret`: A simple helper class is available to add an arrow for the dropdown button.
* `.dropdown__menu`: List of the links to show in the dropdown.

#### Modifier

* `.pull-right`: Add it to a `.dropdown__menu` to right align the dropdown menu.
	
#### States

Add to `<li>` in `.dropdown__menu`

* `.disabled`: To disable the link.
* `.divider`: For a line divider

### Forms

  Individual form controls receive default styling with `.form` Results in stacked, left-aligned labels on top of form controls.

	<form class="form">
		<div class="form__group">
			<label class="form__label">Label</label>
			<div class="form__controls">
				<input type="text" placeholder="Type something…">
			</div>
		</div>
		<div class="form__group">
			<label class="form__label">Select</label>
			<div class="form__controls">
				<span class="form__select">
					<select>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</select>
				</span>
			</div>
		</div>
		<div class="form__group">
			<label class="form__label">Inline Checkboxes</label>
			<div class="form__controls">
				<label class="form__checkbox inline">
					<input type="checkbox" value="option1"> Option
				</label>
				<label class="form__checkbox inline">
					<input type="checkbox" value="option2"> Option
				</label>
				<label class="form__checkbox inline">
					<input type="checkbox" value="option3"> Option
				</label>
			</div>
		</div>
		<div class="form__group">
			<label class="form__label">Append e Prepend</label>
			<div class="form__controls form__controls--multi">
				<span class="form__addon">$</span>
				<input type="text">
				<span class="form__addon">.00</span>
			</div>
		</div>
	</form>	

#### Elements

**Structure**

* `.form__group`: Main container of a section of the form
* `.form__controls`: Container of inputs, buttons and addons

**Basic**

* `.form__label`: Main labels for the form.
* `.form__checkbox`, `.form__radio`: Stacked list of checkboxes and radios.
* `.form__checkbox.inline`, `.form__radio.inline`: Inline list of checkboxes and radios.
* `.form__select`: Create custom style selects.

**Help**

* `.form__help--block`: Block help text that appears under form controls.
* `.form__help--inline`: Inline help text that appears aside form controls.

**Append & Prepend**

* `.form__addon`: Add text or buttons before or after any text-based input. Wrap a `.form__addon` and add `form__controls--multi` to `form__controls` to prepend or append text to an input. Add multiple `.btn` using a `.btn-group`.

**Actions**

* `.form__actions`: End a form with a group of actions (buttons). When placed within a `.form__actions`, the buttons will automatically indent to line up with the form controls.


#### Modifiers	

There are a couple form layouts available to struture the form.

* `.form--grid`: Grid aligned `.form__group` with support for responsive layout with `columns` mixin.
* `.form--aligned`: Right align labels and float them to the left to make them appear on the same line as controls. 
* `.form--inline`: For left-aligned labels and inline-block controls for a compact layout. This layout doesn't support `.form__group`, `.form__addon`, `.form__actions`

        
### Labels

Lables are used to highlight a text; `badge` have small rounded corners and `pill` have full rounded corners.

	<span class="badge">Badge Label</span>
	<span class="pill">Pill label</span>

Labels used in buttons.

	<button class="btn">Action <span class="badge">2</span></button></li>
	<button class="btn btn--pill">Action <span class="pill">2</span></button></li>

### Modals

For modals is used the excellent [**fancyBox**](http://fancyapps.com/fancybox/) jQuery plugin, see full documentation for more in depth examples.

First import it with:
	
	<script src="//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.4/jquery.fancybox.pack.js"></script>

To create a simple modal windows add to the html:
	
	<a class="open__modal" href="#modal">Open modal</a>

And:
	
	<div id="modal" class="modal">
      <h2>Lorem ipsum dolor sit amet</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>

Add to your JS file:

	$(document).ready(function() {
		$(".open__modal").fancybox({
			// Options…
		});
	}); 

### Navs

All nav components here share the same base markup and styles through the `.nav` class.

	<ul class="nav">
		<li class="nav__title">Nav header</li>
		<li class="active"><a href="#">Home</a></li>
		<li class="disabled"><a href="#">Profile</a></li>
		<li><a href="#">Messages</a></li>
	</ul>
	
#### Elements

* `.nav__title`: Nav titles

#### Modifiers
	
* `.nav--btn`: Add blocky links.	
* `.nav--pills`: Add rounded corners to links.
* `.nav--inline`: Horizontal nav layout
* `.nav--vertical`: Vertical nav layout

#### States

Add to `<li>`.

* `.active`: Active button for current page
* `.disabled`: Disabled state style
* `.divider`: Add horizontal line as a divider



### Pager

Quick previous and next links for simple pagination implementations with light markup and styles. It's great for simple sites like blogs or magazines.

By default, the pager centers links.

	<ul class="pager">
		<li><a href="#">Previous</a></li>
		<li><a href="#">Next</a></li>
	</ul>
	
Alternatively, you can align each link to the sides:
	
	<ul class="pager">
		<li class="previous">
			<a href="#">Previous</a>
		</li>
		<li class="next">
			<a href="#">Next</a>
		</li>
	</ul>
	
Pager links also use the general `.disabled` utility class from the pagination.

	<ul class="pager">
		<li class="previous disabled"><a href="#">← Older</a></li>
		<li class="next"><a href="#">Newer →</a></li>
	</ul>

#### States

Add to `<li>`.

* `.disabled`: Disabled state style


### Pagination

Simple pagination inspired by Rdio, great for apps and search results. The large block is hard to miss, easily scalable, and provides large click areas.

Default pagination with `.pagination`, it also support [WP-Paginate](http://wordpress.org/plugins/wp-paginate/).

	<div class="pagination">
		<ul>
			<li><a href="#">Prev</a></li>
			<li><a href="#">1</a></li>
			<li class="active"><a href="#">2</a></li>
			<li><a href="#">3</a></li>
			<li><a href="#">Next</a></li>
		</ul>
	</div>

#### Modifiers	

* `.pagination--center`: Center aligned pagination.
* `.pagination--right`: Right aligned pagination.
* `.pagination--rounded`: Rounded sides.
	
#### States

Add to `<li>`.

* `.active`: Active button for current page
* `.disabled`: Disabled state style


### Sliders

### Tables


For basic styling—light padding and only horizontal dividers—add the base class `.table` to any `<table>`.

	<table class="table">
		<thead>
			<tr>
				<th>Test</th>
				<th>Test</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>test</td>
				<td>test</td>
			</tr>
			<tr>
				<td>test</td>
				<td>test</td>
			</tr>
			<tr>
				<td>test</td>
				<td>test</td>
			</tr>
		</tbody>
	</table>

#### Modifiers

* `.table--striped`: Adds zebra-striping to any table row within the `<tbody>` via the :nth-child CSS selector *(not available in IE7-8)*
* `.table--bordered`: Add borders and rounded corners to the table.
* `.table--hover`: Enable a hover state on table rows within a <tbody>.
* `.table--condensed`: Makes tables more compact by cutting cell padding in half.


## Utilities

### Animations

All the animations in [theCSSguru](https://twitter.com/theCSSguru)'s [Animate mixin](http://thecssguru.freeiz.com/animate/) are available with the same mixin:

**Fade**

* `fadeIn`
* `fadeOut`
* `fadeInUp`
* `fadeOutUp`
* `fadeInDown`
* `fadeOutDown`
* `fadeInRight`
* `fadeOutLeft`
* `fadeInLeft`
* `fadeOutRight`
* `fadeInUpBig`
* `fadeOutUpBig`
* `fadeInDownBig`
* `fadeOutDownBig`
* `fadeInRightBig`
* `fadeOutLeftBig`
* `fadeInLeftBig`
* `fadeOutRightBig`


**Bounce**

* `bounceIn`
* `bounceInDown`
* `bounceInUp`
* `bounceInRight`
* `bounceInLeft`
* `bounceOut`
* `bounceOutUp`
* `bounceOutDown`
* `bounceOutLeft`
* `bounceOutRight`

**Rotate**

* `rotateInDownLeft`
* `rotateInUpLeft`
* `rotateInUpRight`
* `rotateInDownRight`
* `rotateOutDownLeft`
* `rotateOutUpLeft`
* `rotateOutDownRight`
* `rotateOutUpRight`
* `rotateIn`
* `rotateOut`

**Special**

* `flash`
* `bounce`
* `shake`
* `tada`

#### Use

By default are only available `fadeIn` and `fadeOut`. To enable more animations addem to the `$animations` variable in `_effects.scss`.

##### Mixin

	@include animate(fadeIn);

##### Silent classes

There are also available silent classes for all enabled animations to use with `@extend`

	@extend %fadeIn;

### Debug

Add different background colors and border for elements with different proprieties (has class, has id, has title, ect.), usefull for debugging code and finding errors. Taken form [Inuit](https://github.com/csswizardry/inuit.css/blob/master/generic/_debug.scss).

Enable it with `$debug-mode: true;`.

### Helper classes

#### Wrappers

Flexible wrapper to center the layout, max-width width `$desk-end`.

    .wrapper
    .w

Same a `.wrapper` but with fixed width.

    .fixed-wrapper
    .fw

#### Elements width

Add `data-width="n"` to any html element to set the width.

    [data-width="n"]

* **n**: Width in percentage in increments of 5 of the element.

Example: 

	data-width="50"
	
Corrispond to: 
	
	width: 50% !important;`

#### Generic
Add a a simple `transition all`, used as a generic extend for element that can accept transition on all attributes.

    .transition

Simple divider class used in some components (like dropdowns).

    .divider


#### Text replacement

All the text replacement classes from from [html5boilerplate](http://html5boilerplate.com/).

    .ir
    .ir
    .hidden
    .visuallyhidden
    .visuallyhidden
    .invisible
    
### Mixins

Some of them are from Bootstrap, others are custom.

#### Base

	@include clearfix();

#### Shortcuts

##### Create a square
	@include square($size);

* **$size**: dimension used both for width and height

##### Create a rectangle
	@include size($height, $width);

* **$height**: height of the rectangle
* **$width**: width of the rectangle

##### Absolute prositioning an element
	@include position ($position, $coordinates);

* **$position**: fixed, relative, absolute
* **$coordinates**: 0 = null, 0px or more is a value used in the css.

Example:
	@include position (absolute, 0 0px 0px 0);

Become:
	position: absolute;
	right: 0px;
	bottom: 0px;

##### Center element
	@include center-block();

Become
	display: block;
	margin-left: auto;
	margin-right: auto;

##### Center element width psosition absolute
	@include center($width, $height);

* **$width**: Same as `size`
* **$height**: Same as `size`

Esample:
	@include center (500px, 400px);

Become
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -250px;
	margin-left: 200px;

#### Forms

	@include placeholder($color);

* **$color**: Set color for placeholder in inputs


#### Text

##### Text Overflow
	@include text-overflow();

Become

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

##### Hide text
	@include hide-text();

Become

	color:            transparent;
	font:             0/0 a;
	text-shadow:      none;

#### Pseudo Elements

	@include triangle($size, $color, $direction);

* **$size**: Same as `square`
* **$color**: Color of the triangle
* **$direction**: up, down, left, right

##### For now only side triangles with border

	@include triangle_border($size, $color, $border-color, $border-width, $direction);

* **$size**: Same as `square`
* **$color**: Color of the triangle
* **$border-color**: Border color of the triangle
* **$border-width**: Border width of the triangle
* **$direction**: left or right


#### Colors


##### Text inset shadow
	@include text-inset-shadow($bg, $textcolor, $contrast);

* **$bg**: Background color of the text
* **$textcolor**: Color of the text
* **$contrast**: How much stronger the inset will be


##### Alpha Color

Alpha color with ie full opacity fallback (for IE)

	@include alpha-color($color, $alpha, $attribute);

* **$color**: Base HEX color
* **$alpha**: Opacity
* **$attribute**: On what attribute

Example
	@include alpha-color(#000, .5, color);

Become
	color: #000;
	color: rgba(0,0,0,.5);

#### Keyframes support

Used for creating custom animations.

	@include keyframes($name);

* **$name**: Name of the keyframe

#### Components

	@include nav-divider($top $bottom);

* **$top**: Color of the top border
* **$bottom**: Color of the bottom border

###### Images

	@include shadow-comicbook($padding $color $size $distance);

* **$padding**: Border color
* **$color**: Color of the shadow
* **$size**: Size of the shadow
* **$distance**: Distance of the shadow from the image

###### Icon Fonts

Use the unicode character from an icon font to insert it wherever you want.

	@include icon-font($char $font);

* **$char**: Unicode of the character †
* **$font**: What font to use ‡

† For example for: `&#xf000` use `xf000`

‡ Fonts available: Fontawesome, Brandico, Entypo, Fontelico, Maki, Openweb-icons, Typicons, Zocial


#### Media queries

Add media queries to css width simple naming convention.

    @include media(<$media>) {...};

You can set the start/and with of each step from usins the variables `$lap-start`, `$desk-start`, `$desk-end`.


**<$media>**:

* **palm**: Only Palm
* **lap**:  Only Lap
* **lap-and-up**: Lap + Desktop
* **portable**: Lap + Palm
* **desk**: Only Desktop
* **all**: Dektop + Lap + Palm


#### Columns

	@include columns ($cols, $cols-container, $omega, $nth-omega, $remove-omega, $from, $media, $highlight-omega);

* **$cols**: How many columns
* **$cols-container**: Columns of the container (default: $total-columns)
* **$omega**: Bolean, us if is the last column
* **$nth-omega**: If is a multi-row grid list use nth to apply omega to each element at the end of each row (example: `3n` to use omega every 3th element )
* **$remove-omega**: Remove omega on previously applied omega (ignore it)
* **$from**: Direction, left or right
* **$media**: Media query to to use, for responsive grids
* **$highlight-omega**: Bolean, used for debugging nth


### Sprites

Rapido use the compass' [Sprites Mixin](http://compass-style.org/help/tutorials/spriting/) that make including sprites easily both in the html and directly in the css, for more info see the full documentation from the link.

First you need to add to your scss file an import to import all of the seperate icons that will be compiled in a single image. For example if you have a folder named `icons` inside the main `images` folder add this line:
	
	@import "icons/*.png"; // Import all png from icons' folder

Then add you have two options:

Add the sprite in the html with (where `icon_name` is the filename of the icon). 
`.s` is the standard class the must be used with all sprites images.

	<a href="#"><i class="s icons-icon_name"></i> Link</a>
	
Or via `@include` from the scss:

	a:before {
		@include sprite(icon_name)
	}

The result is the same.

## Functions

For 99% of the framework I used Compass' and Susy's functions but I've made some for covering edge cases.

### em()

To convert `PX` to `EM` using the `$base-font-size` as font size.

	width: em(20px);

### rhythm_neg()

Create a negative `rhythm()` value. More info about the rhythm function: [Vertical Rhythm](http://compass-style.org/reference/compass/typography/vertical_rhythm/#function-rhythm).

Example:

	margin-left: rhythm_neg(1);

Become:
	
	margin-left: -1.42857em;

### space_neg()

Similar to `rhythm_neg()` but for Susy's `space()` function, more info:  [Susy Reference](http://susy.oddbird.net/guides/reference/#ref-space).


## Settings

### Base

Debug Mode.

    $debug-mode:                        false
    $default-styles:                    true


Text body size.

    $base-font-size:                    14px
    $base-line-height:                  20px
    $round-to-nearest-half-line:        true

Change text size with media query.

    $responsive-font-size:              lap-and-up $base-font-size, palm 16px


Font families.

    $font-sans:                         "Helvetica Neue", Helvetica, Arial, sans-serif
    $font-serif:                        Georgia, "Times New Roman", Times, serif
    $font-mono:                         Monaco, Menlo, Consolas, "Courier New", monospace

    $base-font-family:                  $font-sans
    $titles-font-family:                $font-sans


### Colors

Used for scaffolding

    $black:                             #000
    $grayDarker:                        lighten($black, 15)
    $grayDark:                          lighten($black, 30)
    $gray:                              lighten($black, 60)
    $grayLight:                         lighten($black, 85)
    $grayLighter:                       lighten($black, 95)
    $white:                             #fff

Base colors

    $text-color: #333

    $link-color:                        #0066cc
    $link-color-hover:                  darken($link-color, 10%)


### Components


Enable or disable components, so you can have in the css only what you need.

    $alerts:                            true
    $breadcrumbs:                       true
    $button-groups:                     true
    $buttons:                           true
    $captions:                          true
    $close:                             true
    $dropdowns:                         true

    $forms:                             true
    $forms-append:                      true
    $forms-grid:                        true
    $forms-aligned:                     true
    $forms-inline:                      true

    $navs:                              true
    $pager:                             true
    $pagination:                        true
    $labels:                            true
    $responsive-navs:                   true
    $tables:                            true

    $tabs:                              true
    $slider:                            true
    $modal:                             true
    $modal-buttons:                     true
    $modal-thumbs:                      true


Icon Fonts ready to use with the mixin `icon-font`.

    $use-fontawesome:                   true

    $use-brandico:                      false
    $use-entypo:                        false
    $use-fontelico:                     false
    $use-maki:                          false
    $use-openweb-icons:                 false
    $use-typicons:                      false
    $use-zocial:                        false

### Dimensions

#### Base

Border radius used as a standard on all elements.

    $base-border-radius:                4px

Labels width in horizontal forms.

    $horizontal-offset:                 180px


#### Text

Font sizes you can used with the compass mixin `adjust-font-size-to()`. Naming convention from [Inuit](http://inuitcss.com/).

    $giga-size:                         $base-font-size * 7
    $mega-size:                         $base-font-size * 5
    $kilo-size:                         $base-font-size * 3.4

    $h1-size:                           $base-font-size * 2.4
    $h2-size:                           $base-font-size * 2
    $h3-size:                           $base-font-size * 1.8
    $h4-size:                           $base-font-size * 1.4
    $h5-size:                           $base-font-size * 1.2
    $h6-size:                           $base-font-size * 1

    $milli-size:                        $base-font-size * .85
    $micro-size:                        $base-font-size * .7


#### Forms

Padding and margins used in the forms.

    $control-margin-bottom:             $base-line-height
    $label-margin-bottom:               10px
    $input-border:                      1px
    $input-padding-top:                 10px
    $input-padding-side:                10px
    $checkbox-padding-left:             20px


#### Paddings

Padding specific to every component you can use to overwrite the base padding.

    $btn-padding:                       $input-padding
    $btn-large-padding:                 em($input-padding-top * 1) em($input-padding-side * 1.5)
    $btn-small-padding:                 em($input-padding-top * .5) em($input-padding-side * .8)
    $btn-mini-padding:                  em($input-padding-top * .1) em($input-padding-side * .6)

    $alerts-padding:                    $input-padding
    $captions-padding:                  $input-padding
    $dropdowns-padding:                 $input-padding
    $modals-error-padding:              $input-padding
    $navs-padding:                      $input-padding
    $pager-padding:                     $input-padding
    $pagination-padding:                $input-padding
    $pills-padding:                     .15em .35em
    $tables-padding:                    $input-padding
    $tabs-content-padding:              $input-padding
    $tabs-tab-padding:                  $input-padding



#### Media Queries

Set the width of the three steps of the layout.

    $lap-start:                         481px      // For Palm
    $desk-start:                        768px      // For Lap
    $desk-end:                          1080px     // For Desktop


#### Grid (Susy)

Default settings for susy grid. More info: [Susy](http://susy.oddbird.net/).

    $total-columns:                     12
    $column-width:                      50px
    $gutter-width:                      30px
    $grid-padding:                      10px
    $container-style:                   fluid


#### z-index order

Default settings for overlay components, taken from Bootstrap.

    $zindex-dropdown:                   1000
    $zindex-popover:                    1010
    $zindex-tooltip:                    1030
    $zindex-slider:                     1040
    $zindex-modal:                      1050
    
### Animations

Keyframe Animation w/ `@include animate(...)`


    $animations:                              fadeIn, fadeOut
    $animations-classes:                      true

    $animations-duration:                     .15s
    $animations-delay:                        0s
    $animations-function:                     ease-out
    $animations-mode:                         both


Transitions w/ `@include transition(...)`


    $default-transition-duration:             $animations-duration
    $default-transition-function:             toBezier($animations-function)



## Default Styles

One of the main reason of the existence of Rapido is because I wanted to separate pure framework code form styling. Every component refer to a silent class for styling form the `_default-style.scss` file. 

These are all the classes available by default, others can be added or removed based on what component you want to enable or disable.



### Titles

    %h1 {...}
    %h2 {...}
    %h3 {...}
    %h4 {...}
    %h5 {...}
    %h6 {...}

### Inputs

    %input {...}
    %input-addon {...}

### Selects

    %select {...}

### Buttons


#### Default

    %btn {...}
    %btn__disabled {...}
    %btn__current {...}
    %btn--primary {...}
    %btn--secondary {...}
    %btn--warning {...}
    %btn--danger {...}
    %btn--info {...}
    %btn--success {...}
    %btn--inverse {...}

#### Generic style for buttons used by the scripts

    %btn--scripts {...}

### Captions

    %caption {...}

### Pills (Labels & Badges)

    %pill {...}

### Dropdowns

    %dropdown {...}
    %dropdown--open {...}

### Caret per Dropdown e Select

    %caret {...}

### Tables

    %table--bordered {...}
    %table--striped {...}
    %table--hover {...}
    %table--sortable {...}

### Navs

    %nav--btn {...}
    %nav--btn__hover {...}
    %nav--btn__active {...}
    %nav--btn__disabled {...}

### Breadcrumbs

    %breadcrumb {...}

### Pagination

    %pagination--btn {...}
    %pagination--btn__hover {...}
    %pagination--btn__active {...}
    %pagination--btn__current {...}
    %pagination--btn__disabled {...}

### Pager

    %pager--btn {...}
    %pager--btn__hover {...}
    %pager--btn__active {...}
    %pager--btn__disabled {...}

### Loader icon

    %loader-ico {...}

### Modals

#### Buttons

    %modal__btn {...}
    %modal__close {...}
    %modal__close--alt {...}
    %modal__btnbar-size {...}

#### Other styles

    %modal__overlay {...}
    %modal__skin {...}
    %modal__nav {...}
    %modal__caption {...}
    %modal__loading {...}

### Sliders

#### Buttons

    %slider__btn {...}

#### Pager

    %slider__pager {...}

#### Other styles

    %slider__caption {...}
    %slider__loading {...}

### Tabs

    %tab__nav {...}
    %tab__btn {...}
    %tab__btn__hover {...}
    %tab__btn__current {...}
    %tab__container {...}

### Alerts

    %alert {...}

### Responsive NAV

    %nav--responsive {...}
    %nav__toggle {...}

## Credits

* [Bootstrap](https://github.com/twitter/bootstrap)
* [Twitter Bootstrap - For Compass](https://github.com/vwall/compass-twitter-bootstrap)
* [Susy [a Compass plugin]](https://github.com/ericam/susy)
* [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)
* [Inuit.css](https://github.com/csswizardry/inuit.css)

## License

MIT License. Copyright 2013 Raffaele Rasini. http://creativebits.it