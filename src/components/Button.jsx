export default function Button (props) {
    return (
        <button disabled={props.disabled} className={`${props.size} px-8 py-2 ${props.variant} rounded-lg`} type={props.type} onClick={props.onClick}>{props.text}</button>
    )
}