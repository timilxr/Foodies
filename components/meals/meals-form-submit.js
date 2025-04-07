"use client";
import { useFormStatus } from "react-dom";

export default function MealsFormSubmit({ children, ...prop }) {
    const { pending } = useFormStatus();

    return (
        <button
            {...prop}
            disabled={pending}
        >
            {pending ? "Submitting..." : children}
        </button>
    );
}