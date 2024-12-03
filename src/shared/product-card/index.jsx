import React, { useCallback, useMemo } from "react";
import { classNames, getTitle } from "../../assets/utils/helper";
import { IMAGE_PATH } from "../../assets/utils/constant";
import { ICONS } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../assets/utils/urls";
import ReactHelmet from "../../containers/seo/helmet";
import DUMMY_IMAGE from "../../assets/images/skeleton.jpeg"

const ProductCard = ({
    id,
    imgClass,
    className,
    variant,
    handleWishlist,
    disabledMeta,
    ...props
}) => {
    const navigate = useNavigate();

    const handleRedirect = useCallback(
        (path = "") => {
            navigate(path);
        },
        [navigate]
    );

    const renderImages = useMemo(() => {
        if (variant?.images?.length) {
            const clone = [...variant?.images];
            return IMAGE_PATH + clone?.[0]?.image_file;
        } else return DUMMY_IMAGE;
    }, [variant]);

    const imageAlterTag = useMemo(() => {
        if (variant?.images?.length) {
            const clone = [...variant?.images];
            return IMAGE_PATH + clone?.[0]?.image_altertag;
        } else return "";
    }, []);

    const attribute = useMemo(() => {
        if (!variant) return {}
        const clone = [...variant?.attributeData];
        return clone?.length ? clone?.[0] : {};
    }, [variant]);

    const sizes = useMemo(() => {
        if (!variant) return []
        const clone = [...variant?.attributeData];
        return [...new Set(clone.map((val) => val.size))];
    }, [variant]);

    return (
        <ReactHelmet
            {...{
                title: props?.meta_title,
                description: props?.meta_description,
                keywords: props?.meta_keywords, disabledMeta
            }}
        >
            <div
                onClick={() => handleRedirect(`${PAGES.PRODUCTS.path}/${id}/${getTitle(props?.meta_title || variant?.name)}`)}
                className={classNames(
                    "w-full productItem01 flex flex-col cursor-pointer items-center justify-center relative h-auto",
                    className
                )}
            >
                <div onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist(id, props?.wishlist);
                }} className="absolute z-[9] top-1 md;top-2 right-1 md:right-2 cursor-pointer bg-slate-100 rounded-full p-2">
                    {props?.wishlist ? (
                        <ICONS.HEART_FILL className="w-6 h-6 text-pink" />
                    ) : (
                        <ICONS.HEART_EMPTY className="w-6 h-6 text-pink" />
                    )}
                </div>
                {attribute?.discount ? (
                    <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-green z-[9] text-white text-xs rounded-md md:rounded-lg px-2 py-1">
                        {attribute?.discount ? `-${attribute?.discount}%` : null}
                    </div>
                ) : null}
                <div className="w-full relative pi01Thumb">
                    <img
                        alt={imageAlterTag}
                        src={renderImages}
                        className={classNames(
                            "rounded-xl xl:min-h-[400px] object-cover object-center",
                            imgClass
                        )}
                    />
                    <img
                        alt={id}
                        src={renderImages}
                        className={classNames("absolute bottom-0 left-[100%] opacity-0 hover:opacity-100 hover:left-0 overflow-hidden rounded-xl xl:min-h-[400px] object-cover object-center transition duration-300 ease-in-out -scale-x-100", imgClass)}
                    />
                </div>
                <div className="mt-1 md:mt-3 w-full flex flex-col justify-start">
                    <p className="text-text text-base max-w-xs overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
                        {variant?.name || ""}
                    </p>
                    <div className="w-full flex justify-start items-center my-1.5 text-lg md:text-xl font-medium">
                        <ins className="no-underline">₹ {attribute?.selling_price}</ins>
                        <del className="ml-4 line-through text-sm md:text-base text-less">
                            ₹ {attribute?.mrp}
                        </del>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <div
                            className={classNames(
                                "w-5 items-center justify-center border-text-secondary border h-5 md:w-6 md:h-6 rounded-full p-0.5"
                            )}
                        >
                            <div
                                style={{ background: variant?.color_code }}
                                className="w-full h-full rounded-full"
                            ></div>
                        </div>
                        <div className="flex items-center justify-end">
                            {sizes.map((size) => (
                                <div
                                    className="border rounded-sm text-sm px-1 text-text-secondary min-w-6 py-0.5 ml-1 flex items-center justify-center border-text-secondary"
                                    key={size}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ReactHelmet>
    );
};

export default ProductCard;
