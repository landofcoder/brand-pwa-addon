import React, {Fragment} from 'react';
import { useListBrandGroup} from "../../hooks/useListBrandGroup";
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";
import { Title} from "@magento/venia-ui/lib/components/Head";
import BreadCrumb from '../breadcrumb/index';
import classes from './brandGroup.css';
import { Link } from '@magento/venia-drivers';
import Icon from "@magento/venia-ui/lib/components/Icon";
import { Search as SearchIc } from 'react-feather';
import SearchBrandBar from "../searchBrand";
import ShopByBrand from "../brandInfo/shopByBrand";
import BrandGroupSideBar from "./brandGroupSideBar";
import { useParams } from 'react-router-dom';
import { Util } from '@magento/peregrine';
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const searchIcon = <Icon src={SearchIc} attrs={{ width: 16 }} />;

const BrandGroup = props => {
    const brandConfiguration = storage.getItem('BrandConfiguration');
    const group_page_item_per_page = brandConfiguration.Brand.group_page_item_per_page;
    const group_page_show_brand_name = brandConfiguration.Brand.group_page_show_brand_name;
    const brand_list_page_page_title = brandConfiguration.Brand.brand_list_page_page_title;
    const general_settings_enable_search = brandConfiguration.Brand.general_settings_enable_search;
    const general_settings_enable_menu = brandConfiguration.Brand.general_settings_enable_menu;
    const { brandGroupUrl } = useParams();
    const { listBrandGroupData, listBrandGroupError, listBrandGroupLoading } = useListBrandGroup({ brandGroupUrl, group_page_item_per_page });
    let brandGroup = null;
    if (listBrandGroupError) {
        return 'No items';
    }
    if (listBrandGroupLoading) {
        return <LoadingIndicator />;
    }
    if (
        listBrandGroupData &&
        listBrandGroupData.lofBrandGroups &&
        listBrandGroupData.lofBrandGroups.items &&
        listBrandGroupData.lofBrandGroups.total_count !== 0
    ) {
        brandGroup = listBrandGroupData.lofBrandGroups.items[0]
    }

    return (
        <React.Fragment>
            <Title>{brandGroup.name}</Title>
            <div className={classes.breadCrumb}>
                <Link className={classes.breadCrumbLink} to="/">{`Home`}</Link>
                <span className={classes.breadCrumbSeparator}>{`/`}</span>
                <span className={classes.breadCrumbText}>{`Brands Group`}</span>
                <span className={classes.breadCrumbSeparator}>{`/`}</span>
                <Link className={classes.breadCrumbLink} to="/brands.html">{brand_list_page_page_title ? brand_list_page_page_title : `All Brands`}</Link>
                <span className={classes.breadCrumbSeparator}>{`/`}</span>
                <span className={classes.breadCrumbText}>{brandGroup.name}</span>
            </div>
            <div className={classes.brandsContainer}>
                <div className={classes.brandsListLeft}>
                    {
                        general_settings_enable_search ? (
                            <div>
                                <div className={classes.brandsSearchLabel}>
                                    <span>{`Search Brand`}:</span>
                                </div>
                                <SearchBrandBar />
                            </div>
                        ) : (
                            <div/>
                        )
                    }
                    {
                        general_settings_enable_menu ? (
                            <div className={classes.shopByBrand}>
                                <ShopByBrand />
                            </div>
                        ) : (
                            <div/>
                        )
                    }
                    {
                        general_settings_enable_menu ? (
                            <div className={classes.brandGroupSideBar}>
                                <BrandGroupSideBar />
                            </div>
                        ) : (
                            <div/>
                        )
                    }
                </div>
                <div className={general_settings_enable_search || general_settings_enable_menu ? classes.brandsListRight : classes.brandsListRightDisableSideBar}>
                    <div className={classes.brandsListTitle}>
                        <span>{`Brand Group List`}</span>
                    </div>
                    <div className={classes.brandListRow}>
                        {brandGroup.brands.items.map(
                            (brand, index) => {
                                const lowercase = brand.name.toLowerCase();
                                const formatted = lowercase.replace(' ', '-');
                                return (
                                    <Link key={index} to={`/brand/${formatted}.html`}>
                                        <div className={classes.brandItem}>
                                            <div className={classes.brandItemContent}>
                                                <div className={classes.brandItemImage}>
                                                    <img src={brand.thumbnail} className={classes.brandThumbnail}/>
                                                </div>
                                                {
                                                    group_page_show_brand_name ? (
                                                        <div className={classes.brandItemName}>
                                                            <div className={classes.brandItemNameContent}>
                                                                <span>{brand.name}</span>
                                                            </div>
                                                            <div className={classes.brandContentTitleCountList}>
                                                                <span>{brand.products.total_count}</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className={classes.brandItemName}>
                                                            <div>
                                                                <span>{`Total Products`}: {brand.products.total_count}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </Link>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default BrandGroup;
