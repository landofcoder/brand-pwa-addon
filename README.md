# Brand Pro for PWA-Studio

Magento 2 Brand Extension.

## Installation Environment
Require magento 2.4.x or above.
Require PWA studio version 8.0.x or above.
Require extension lof-product-extend-pwa-component.
The addons require setup backend magento 2 extensions:
- Ves Brand, Brand Graphql
- Copy folder from https://github.com/landofcoder/brand-pwa-addon to packages/extensions/
and add ```"@landofcoder/lof-brand-module": "1.0.0"``` in dependencies venia-concept
- Run ```yarn install``` to install dependencies
- Run pwa project ```yarn watch:all```
See result of blog module : http://0.0.0.0:10000/brands.html
## Demo Brand
https://demo-pwa.landofcoder.com/brands.html
