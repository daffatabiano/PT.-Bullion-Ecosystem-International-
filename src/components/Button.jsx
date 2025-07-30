export default function Button (props) {
    props.size = 'w-full'
    props.variant = 'bg-orange-primary text-white'
    
    return (
        <button className={`${props.size} px-8 py-2 ${props.variant} rounded-lg`} type={props.type} onClick={props.onClick}>{props.text}</button>
    )
}