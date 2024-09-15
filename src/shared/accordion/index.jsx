import React, { useEffect, useMemo, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { classNames } from "../../assets/utils/helper";
import { ICONS } from "../../assets/icons";

const CustomAccordion = ({
    rootClass,
    accordion,
    cat_id,
    sub_sub_cat_id,
    handleValue,
    ...props
}) => {
    const [value, setValue] = useState(Number(cat_id));

    const handleChange = (item) => {
        setValue(item);
    };

    const getId = useMemo(() => {
        if (cat_id) return Number(cat_id);
        const clone = [...accordion];
        const recent = clone.find((item) =>
            item?.items?.some(({ id }) => id === Number(sub_sub_cat_id))
        );
        return recent?.id || 0;
    }, [cat_id, accordion, sub_sub_cat_id]);

    useEffect(() => {
        setValue(getId);
    }, [getId]);

    console.log("accordion", accordion);

    return (
        <Accordion.Root
            {...props}
            collapsible
            value={value}
            onValueChange={(val) => handleChange(val)}
            type="single"
            className={classNames("bg-transparent w-full", rootClass)}
        >
            {accordion?.map((item) => (
                <Accordion.Item
                    key={item?.id}
                    className="space-y-4 border-b border-gray-200 py-4 text-sm font-medium text-text"
                    value={item?.id}
                >
                    <Accordion.Header className="flex w-full">
                        <Accordion.Trigger className="font-medium w-full flex justify-between items-center">
                            <p className="text-text font-medium">{item?.label || ""}</p>
                            {value === item?.id ? (
                                <ICONS.MINUS className="w-5 h-5 text-text" />
                            ) : (
                                <ICONS.PLUS className="w-5 h-5 text-text" />
                            )}
                        </Accordion.Trigger>
                    </Accordion.Header>
                    {item?.items?.map((sub, i) => {
                        const isSelected = sub?.id
                            ? sub?.id === Number(sub_sub_cat_id)
                            : sub?.ids?.join(",") === sub_sub_cat_id;
                        return (
                            <Accordion.Content
                                onClick={() => handleValue && handleValue(item, sub)}
                                key={i}
                                className={classNames("flex items-center w-full")}
                            >
                                <p
                                    className={classNames(
                                        "cursor-pointer font-medium text-text w-full py-2 px-3 rounded-lg hover:bg-gray-100",
                                        isSelected
                                            ? "bg-select !text-white hover:!bg-select hover:!text-white"
                                            : ""
                                    )}
                                >
                                    {sub?.label || ""}
                                </p>
                            </Accordion.Content>
                        );
                    })}
                </Accordion.Item>
            ))}
        </Accordion.Root>
    );
};

export default CustomAccordion;
