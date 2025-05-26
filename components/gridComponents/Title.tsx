interface Props {
    label: string;
}

function Title({label}: Props) {
    return <div className="text-2xl pt-5">{label}</div>
}

export default Title;