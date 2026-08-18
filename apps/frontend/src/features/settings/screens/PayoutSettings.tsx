import { getPayoutAccountApi, updatePayoutAccountApi } from "@/features/settings/api";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldGroup } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useAuth } from "@/providers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const defaultForm = {
    accountHolderName: "",
    country: "Australia",
    currency: "AUD",
    payoutMethod: "BANK",
    bankName: "",
    routingNumber: "",
    accountNumber: "",
    paypalEmail: "",
    taxResidency: "Australia",
    businessType: "INDIVIDUAL",
};

function PayoutSettings() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState(defaultForm);
    const [status, setStatus] = useState("DRAFT");
    const [isSaving, setIsSaving] = useState(false);

    const updateField = (field: keyof typeof defaultForm, value: string) => {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    }

    const loadPayoutAccount = async () => {
        try {
            const response = await getPayoutAccountApi();
            const payoutAccount = response.payoutAccount;

            if (!payoutAccount) return;

            setForm({
                accountHolderName: payoutAccount.accountHolderName ?? "",
                country: payoutAccount.country ?? "Australia",
                currency: payoutAccount.currency ?? "AUD",
                payoutMethod: payoutAccount.payoutMethod ?? "BANK",
                bankName: payoutAccount.bankName ?? "",
                routingNumber: payoutAccount.routingNumber ?? "",
                accountNumber: payoutAccount.accountNumber ?? "",
                paypalEmail: payoutAccount.paypalEmail ?? "",
                taxResidency: payoutAccount.taxResidency ?? "Australia",
                businessType: payoutAccount.businessType ?? "INDIVIDUAL",
            });
            setStatus(payoutAccount.status ?? "DRAFT");
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            }
            else {
                toast.error("Couldn't load payout settings");
            }
        }
    }

    const savePayoutAccount = async () => {
        try {
            setIsSaving(true);
            const response = await updatePayoutAccountApi(form);
            setStatus(response.payoutAccount?.status ?? "DRAFT");
            toast.success("Payout settings saved");
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            }
            else {
                toast.error(error.response?.data?.message ?? "Couldn't save payout settings");
            }
        } finally {
            setIsSaving(false);
        }
    }

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        loadPayoutAccount();
    }, [isLoggedIn]);

    return (
        <div className="flex w-full max-w-250 flex-col gap-4 px-2">
            <div className="rounded-md border p-4 shadow-sm">
                <h1 className="text-xl font-bold">Creator Payout Settings</h1>
                <p className="mt-1 text-sm text-gray-600">
                    Add payout details for future course subscription revenue. Payments are not processed in this demo.
                </p>
                <div className="mt-3 inline-flex rounded-md border px-2 py-1 text-xs font-medium uppercase text-gray-600">
                    {status.replaceAll("_", " ")}
                </div>
            </div>

            <div className="rounded-md border p-4 shadow-sm">
                <FieldGroup>
                    <div className="grid gap-3 md:grid-cols-2">
                        <Field>
                            <Label htmlFor="account-holder-name">Legal name</Label>
                            <Input id="account-holder-name" value={form.accountHolderName} onChange={(event) => updateField("accountHolderName", event.target.value)} />
                        </Field>

                        <Field>
                            <Label htmlFor="business-type">Account type</Label>
                            <select
                                id="business-type"
                                value={form.businessType}
                                onChange={(event) => updateField("businessType", event.target.value)}
                                className="h-9 rounded-md border bg-transparent px-3 text-sm"
                            >
                                <option value="INDIVIDUAL">Individual</option>
                                <option value="BUSINESS">Business</option>
                            </select>
                        </Field>

                        <Field>
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" value={form.country} onChange={(event) => updateField("country", event.target.value)} />
                        </Field>

                        <Field>
                            <Label htmlFor="tax-residency">Tax residency</Label>
                            <Input id="tax-residency" value={form.taxResidency} onChange={(event) => updateField("taxResidency", event.target.value)} />
                        </Field>

                        <Field>
                            <Label htmlFor="currency">Currency</Label>
                            <select
                                id="currency"
                                value={form.currency}
                                onChange={(event) => updateField("currency", event.target.value)}
                                className="h-9 rounded-md border bg-transparent px-3 text-sm"
                            >
                                <option value="AUD">AUD</option>
                                <option value="USD">USD</option>
                                <option value="VND">VND</option>
                            </select>
                        </Field>

                        <Field>
                            <Label htmlFor="payout-method">Payout method</Label>
                            <select
                                id="payout-method"
                                value={form.payoutMethod}
                                onChange={(event) => updateField("payoutMethod", event.target.value)}
                                className="h-9 rounded-md border bg-transparent px-3 text-sm"
                            >
                                <option value="BANK">Bank transfer</option>
                                <option value="PAYPAL">PayPal</option>
                            </select>
                        </Field>
                    </div>

                    {form.payoutMethod === "BANK" ? (
                        <div className="grid gap-3 md:grid-cols-2">
                            <Field>
                                <Label htmlFor="bank-name">Bank name</Label>
                                <Input id="bank-name" value={form.bankName} onChange={(event) => updateField("bankName", event.target.value)} />
                            </Field>

                            <Field>
                                <Label htmlFor="routing-number">BSB / routing number</Label>
                                <Input id="routing-number" value={form.routingNumber} onChange={(event) => updateField("routingNumber", event.target.value)} />
                            </Field>

                            <Field>
                                <Label htmlFor="account-number">Account number</Label>
                                <Input id="account-number" value={form.accountNumber} onChange={(event) => updateField("accountNumber", event.target.value)} />
                            </Field>
                        </div>
                    ) : (
                        <Field>
                            <Label htmlFor="paypal-email">PayPal email</Label>
                            <Input id="paypal-email" type="email" value={form.paypalEmail} onChange={(event) => updateField("paypalEmail", event.target.value)} />
                        </Field>
                    )}
                </FieldGroup>

                <div className="mt-4 flex justify-end">
                    <Button className="bg-main hover:bg-main-hover" disabled={isSaving} onClick={savePayoutAccount}>
                        Save payout settings
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PayoutSettings;
