"use client"

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"

type comboboxBasicProp = {
    values: string[];
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function ComboboxBasic({ values, value, setValue } : comboboxBasicProp) {
    return (
        <Combobox items={values} value={value} onValueChange={(val) => setValue(val ?? "")}>
            <ComboboxInput placeholder="Select a framework" />
            <ComboboxContent className="z-50 pointer-events-auto">
                <ComboboxEmpty>
                    No items found.
                </ComboboxEmpty>
                <ComboboxList>
                {(item) => (
                    <ComboboxItem key={item} value={item}>
                    {item}
                    </ComboboxItem>
                )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}
