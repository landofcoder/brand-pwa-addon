/**
 * Mappings for overwrites
 * example: [`@magento/venia-ui/lib/components/Main/main.js`]: './lib/components/Main/main.js'
 */
module.exports = componentOverride = {
    [`@magento/pwa-buildpack/lib/queries/getStoreConfigData.graphql`]: '@landofcoder/lof-brand-module/src/overwrites/queries/getStoreConfigData.graphql',
    [`@magento/peregrine/lib/talons/Footer/useFooter.js`]: '@landofcoder/lof-brand-module/src/overwrites/talons/useFooter.js',
    ['@landofcoder/lof-product-extend-components/lib/talons/ProductDetail/useBrandList.js']: './wrapperBrandList.js',
    ['@landofcoder/lof-product-extend-components/lib/talons/Homepage/useTopBrands.js']: './wrapperTopBrands.js'
};
