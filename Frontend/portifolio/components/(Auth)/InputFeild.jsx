export default function InputFeild({
    placeholder,
    type,
    inputvalue
}) {

    return (
        <div>
            <input
                placeholder={placeholder}
                type={type}
                onChange={(e) => inputvalue(e.target.value)}
            />
        </div>
    );
}