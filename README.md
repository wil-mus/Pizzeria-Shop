# PIZZA SHOP
#### A Pizza shop website where customers can make orders online
#### By **Wilfred Musyoka Promise Mutenhaunga**
*******
## Description
Pizza palace is a website for an imaginary pizza shop where customers can visit the site and order pizza online
## Setup/Installation Requirements
* clone the repository to your local computer
* Open the project folder 
* (Optional) Open in a text editor (preffered Visual studio code or Atom)       Download a Live-server package on the editor and run the project.         (Default port is 5500)
*  Alternative to step 3, you may start up the project with a simple python http server.

    Python 3

    ```bash
        python -m http.server 8080
    ```
    Python 2

    ```bash
        python -m SimpleHTTPServer 8080
    ```
* Use updated browsers. Google chrome and Firefox are preferred. Code uses ES6 syntax.
## Known Bugs
  NO KNOWN BUG
## Technologies Used
 * HTML
 * CSS
    * Flexbox
    * -webkit- prefixes
 * JavaScript
    * ES6
 * Jquery
 * Google Fonts

 --------
## BDD 
| Action                       	| Expected Behaviour                                            	| Possible Impementation                               	|
|------------------------------	|---------------------------------------------------------------	|------------------------------------------------------	|
| Page Load                    	| Image carousel display                                        	| Bootstrap | jQuery                                   	|
| Click Add to Cart Button     	| Hide Button, Display buttons to add or remove items from cart 	| jQuery click events                                  	|
| click add/minus button       	| Add/Remove items from cart                                    	| Javascript functions                                 	|
| Decrease item to zero        	| Hide add/minus buttons and reveal Add to cart button again    	| Javascript functions and jQuery events               	|
| Click on fixed Cart button   	| Reveal Modal with order summary                               	| jQuery events                                        	|
| click on checkout button     	| Reset Form, and clear all orders                              	| jQuery reset form and Javascript array splice method 	|
| customize order, add to cart 	| update price display                                          	| Javascript functions                                 	|

## Support and contact details
    Holla me at musyokawilfred6@gmail.com if you run into any additional issues!
