"use client"

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import type React from "react";

const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
] as const

type comboboxBasicProp = {
    values: string[];
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function ComboboxBasic({ values, value, setValue } : comboboxBasicProp) {
    return (
        <Combobox items={values} value={value} onValueChange={(val) => setValue(val ?? "")}>
            <ComboboxInput placeholder="Select a framework" value={value}/>
            <ComboboxContent>
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
