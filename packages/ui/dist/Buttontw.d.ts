/**
 * Primary UI component for user interaction
 */
declare const Buttontw: ({ primary, size, label, ...props }: {
    [x: string]: any;
    primary?: boolean | undefined;
    size?: string | undefined;
    label?: string | undefined;
}) => JSX.Element;

export { Buttontw };
