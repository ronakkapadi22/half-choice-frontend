import React, { useCallback, useMemo } from "react";
import { classNames } from "../../assets/utils/helper";
import { IMAGE_PATH } from "../../assets/utils/constant";
import { ICONS } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../assets/utils/urls";

const ProductCard = ({
    id,
    className,
    variant,
    handleWishlist,
    ...props
}) => {

    const navigate = useNavigate()

    const handleRedirect = useCallback((path = '') => {
        navigate(path)
    }, [navigate])

    const renderImages = useMemo(() => {
        if (variant?.image) {
            const clone = variant?.image?.split(",");
            return IMAGE_PATH + clone?.[0];
        } else return "";
    }, [variant]);

    const attribute = useMemo(() => {
        const clone = [...variant?.attributeData];
        return clone.length ? clone?.[0] : {};
    }, [variant]);

    const sizes = useMemo(() => {
        const clone = [...variant?.attributeData];
        return [...new Set(clone.map((val) => val.size))];
    }, [variant]);

    return (
        <div
            className={classNames(
                "w-full flex flex-col items-center justify-center relative h-auto",
                className
            )}
        >
            <div className="absolute top-2 right-2 cursor-pointer bg-slate-100 rounded-full p-2">
                {props.wishlist ? (
                    <ICONS.HEART_FILL
                        onClick={() => handleWishlist(id, props.wishlist)}
                        className="w-6 h-6 text-pink"
                    />
                ) : (
                    <ICONS.HEART_EMPTY
                        onClick={() => handleWishlist(id, props.wishlist)}
                        className="w-6 h-6 text-pink"
                    />
                )}
            </div>
            {attribute?.discount ? (
                <div className="absolute top-2 left-2 bg-green text-white text-xs rounded-lg px-2 py-1">
                    {attribute?.discount ? `-${attribute?.discount}%` : null}
                </div>
            ) : null}
            <div className="w-full">
                <img
                    alt={id}
                    src={renderImages}
                    className="rounded-xl xl:min-h-[400px] object-cover object-center"
                />
            </div>
            <div className="mt-3 w-full flex flex-col justify-start">
                <p onClick={() => handleRedirect(PAGES.PRODUCTS.path + '/' + id)} className="text-text text-base max-w-xs overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
                    {variant?.name || ""}
                </p>
                <div className="w-full flex justify-start items-center my-1.5 text-xl font-medium">
                    <ins className="no-underline">₹ {attribute?.selling_price}</ins>
                    <del className="ml-4 line-through text-base text-less">
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
    );
};

export default ProductCard;
