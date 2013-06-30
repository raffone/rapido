# Rapido Framework

## Intro

An easy and quick **Sass** + **Compass** + **Susy** prototyping framework based on Bootstrap without all the default styles.


## Why?

The Rapido framework, is the product of a couple of months trying to figure out a way to incorporate a common framework in all my front-end projects, both for personal and client works. I started to look around at complete frameworks for quick prototyping and found three: Bootstrap, Foundation and Inuit. The first two are very similar, Bootstrap has more features that i never use so they where basically the same for me, Inuit is much smaller and more object oriented (ex: BEM naming convention).

The problem was that after the first prototypes they where very difficult to tame and style like I wanted (and please, bootswatch.com and wrapbootstrap.com doesn't count, I mean real full designs). So I wanted to create a frankestein's framework with all the useful components from bootstrap, everything in variables like Foundation and the easy styling of Inuit.

I started taking off all the unnecessary bits from bootstrap, adding inuit variables and naming conventions and I was pretty happy with it, but then I started refactoring all the code, adding susy grids, structuring the files in a different way, cleaning all the unnecessary hacks for retro-compatibility, adding a bunch of useful mixing, and so on… so after all of this I thought that it may be useful for others.

#### Feedbacks
It was (and still is) made for my personal use so some stuff may seems strange but this is how I work, maybe with your help we can make it better, if you find a better solution of somethign covered in the framework please contact me and we'll se if it can work.

## Settings

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

	<ul class="breadcrumb">
	  <li><a href="#">Home</a></li>
	  <li><a href="#">Library</a></li>
	  <li class="active">Data</li>
	</ul>
    
### Button-groups

Wrap a series of buttons with .btn in .btn-group.

    <ul class="btn-group">
      <li><button class="btn">Left</button></li>
      <li><button class="btn">Middle</button></li>
      <li><button class="btn">Right</button></li>
    </ul>
    
### Buttons


Button styles can be applied to anything with the `.btn` class applied. However, typically you'll want to apply these to only `<a>` and `<button>` elements for the best rendering.


    <button class="btn">Default</button>
    <button class="btn hover">Hover</button>
    <button class="btn active">Active</button>
    <button class="btn disabled">Disabled</button>
    

#### Button colors

Colored buttons with `btn--primary` (green) and `btn--secondary` (red).
    <button class="btn">Default</button>
    <button class="btn btn--primary">Primary</button>
    <button class="btn btn--secondary">Secondary</button>
    
Also availables classes you that can be used: `.btn--warning`, `.btn--danger`, `.btn--info`, `.btn--success` and `.btn--inverse`. By they default are styless but you can personalize them in `_default-style.css`.


    <button class="btn btn--warning">Warning</button>
    <button class="btn btn--danger">Danger</button>
    <button class="btn btn--info">Info</button>
    <button class="btn btn--success">Success</button>
    <button class="btn btn--inverse">Inverse</button>
    
#### Button sizes

Fancy larger or smaller buttons? Add `.btn--large`, `.btn--small`, or `.btn--mini` for additional sizes.    

    <button class="btn">Default</button>
    <button class="btn btn--large">Large</button>
    <button class="btn btn--small">Small</button>
    <button class="btn btn--mini">Mini</button>
    
    
#### Modifiers

Create block level buttons—those that span the full width of a parent— by adding `.btn--block`.

	<button class="btn btn--block">Block</button>    

##### Button pill

Button width rounded full corners with `.btn--pill`.
    
	<button class="btn btn--pill">Pill</button>
	
##### Block Link

Deemphasize a button by making it look like a link while maintaining button behavior

	<button class="btn btn--link">Link</button>			
##### Disabled button

Add the `.disabled` class to `<a>` and `<button>` buttons to add a disabled state style.

	<a href="#" class="btn btn--large btn--primary disabled">Primary link</a>
	<a href="#" class="btn btn--large disabled">Link</a>

### Captions

  Position `bottomleft`.

  You can use: `top`, `right`, `bottom`, `left`, `topleft`, `topright`, `bottomright`, `bottomleft`.

    <figure class="caption--bottomleft" data-content="Caption text.">
      <img src="http://dummyimage.com/300x200/afe600/fff" />
    </figure>

#### Animations

##### Float

Add fade slide animation form `top` or `bottom`.

Ex. below: Float from top

    <figure class="caption--float-top" data-content="Caption text.">
      <img src="http://dummyimage.com/300x200/afe600/fff" />
    </figure>

##### Fade

Ex. below: Fade from bottom

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

#### Aligning the menus
Add `.pull-right` to a `.dropdown__menu` to right align the dropdown menu.

	<ul class="dropdown__menu pull-right" role="menu" aria-labelledby="dLabel">
	  ...
	</ul>
	
#### Disabled menu options

Add `.disabled` to a `<li>` in the dropdown to disable the link.

	<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
	  <li><a tabindex="-1" href="#">Regular link</a></li>
	  <li class="disabled"><a tabindex="-1" href="#">Disabled link</a></li>
	  <li><a tabindex="-1" href="#">Another link</a></li>
	</ul>
	
#### Caret icon	

A simple helper class is available to add an arrow for the dropdown button.

    <span class="dropdown__caret"></span>


### Forms

  Individual form controls receive default styling with `.form` Results in stacked, left-aligned labels on top of form controls.

    <form class="form">
      <fieldset>
        <legend>Legend</legend>
        <label>Label name</label>
        <input type="text" placeholder="Type something…">
        <span class="form__help--block">Example block-level help text here.</span>
        <label class="form__checkbox">
          <input type="checkbox"> Check me out
        </label>
        <button type="submit" class="btn">Submit</button>
      </fieldset>
    </form>

#### Labels

	<label class="form__label">Label</label>


#### Radio & Checkbox


Checkboxes are for selecting one or several options in a list while radios are for selecting one option from many.


##### Stacked controls


	<label class="form__checkbox">
	  <input type="checkbox" value="">
	  Option one is this and that—be sure to include why it's great
	</label>
	<label class="form__radio">
	  <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
	  Option one is this and that—be sure to include why it's great
	</label>
	<label class="form__radio">
	  <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
	  Option two can be something else and selecting it will deselect option one
	</label>


##### Inline controls


	<label class="form__checkbox inline">
	  <input type="checkbox" value="option1"> Option
	</label>
	<label class="form__checkbox inline">
	  <input type="checkbox" value="option2"> Option
	</label>
	<label class="form__checkbox inline">
	  <input type="checkbox" value="option3"> Option
	</label>

#### Custom selects

Create custom style selects with `.form__select`.

	<span class="form__select">
	  <select>
	    <option>1</option>
	    <option>2</option>
	    <option>3</option>
	    <option>4</option>
	    <option>5</option>
	  </select>
	</span>
	
#### Help

Inline and block level support for help text that appears around form controls.

##### Inline help

	<input type="text" placeholder="Type something…">
	<span class="form__help--block">Help block</span>

##### Block help	
	
	<input type="text" placeholder="Type something…">
	<span class="form__help--inline">Help inline</span>

#### Prepend & Append

  Add text or buttons before or after any text-based input.

  Wrap an `.form__addon` and add `form__controls--multi` to `form__controls` to prepend or append text to an input.

##### Prepend

	<div class="form__controls form__controls--multi">
	  <span class="form__addon">$</span>
	  <input type="text" placeholder="Type something…">
	</div>
	
##### Append
	
	<div class="form__controls form__controls--multi">
	  <input type="text" placeholder="Type something…">
	  <span class="form__addon">.00</span>
	</div>
	
##### Both Prepend and Append
	
	<div class="form__controls form__controls--multi">
	  <span class="form__addon">$</span>
	  <input type="text" placeholder="Type something…">
	  <span class="form__addon">.00</span>
	</div>

##### Buttons

Instead of a `<span>` with text, use a `.btn` to attach a button to an input.

	<div class="form__controls form__controls--multi">
	  <input type="text" placeholder="Type something…">
	  <button class="btn">Go</button>
	</div>

Multiple button within `.btn-group`


	<div class="form__controls form__controls--multi">
	  <input type="text" placeholder="Type something…">
	  <div class="btn-group">
	    <button class="btn">Go</button>
	    <button class="btn">Go</button>
	  </div>
	</div>  

#### Form actions


End a form with a group of actions (buttons). When placed within a `.form__actions`, the buttons will automatically indent to line up with the form controls.

    <form class="form">
      <div class="form__actions">
        <button type="submit" class="btn btn--primary pull-right">Primary</button>
        <button type="button" class="btn btn--secondary">Secondary</button>
      </div>
    </form>

#### Layouts

There are a couple form layouts available to struture the form.

##### Grid

Grid aligned `.form__group` with support for responsive layout with `columns` mixin.

* Add `.form--grid` to the form
* Wrap labels and controls in `.form__group`
* Add `.form__label` to the label
* Wrap any associated controls in `.form__controls` for proper alignment
  
##### Aligned

Right align labels and float them to the left to make them appear on the same line as controls. 

Same html as grid but with `.form--aligned` instead of `.form--grid`.

##### Inline

Add `.form-inline` for left-aligned labels and inline-block controls for a compact layout.

    <form class="form form--inline">
      <label class="form__label">Example label</label>
      <input type="text" placeholder="First Input">
      <input type="text" placeholder="Second Input">
      <button type="submit" class="btn">Default</button>
    </form>
        
### Labels

### Modals

### Navs

### Pager

### Pagination

### Sliders

### Tables


## Settings


### Credits:

 * Bootstrap: https://github.com/twitter/bootstrap
 * Twitter Bootstrap - For Compass:  https://github.com/vwall/compass-twitter-bootstrap
 * Susy [a Compass plugin]: https://github.com/ericam/susy
 * HTML5 Boilerplate: https://github.com/h5bp/html5-boilerplate

### License

MIT License. Copyright 2013 Raffaele Rasini. http://creativebits.it