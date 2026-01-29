
export default function LanguagesComp(props) {
    const styles = {
        backgroundColor: props.backgroundColor,
        color: props.color,
    }
    return (
        <div className={props.className} style={styles}>
            <h2>{props.name}</h2>
        </div>
    )
}