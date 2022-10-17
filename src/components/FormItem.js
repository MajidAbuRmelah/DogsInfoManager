import '../css/FormItem.css';

function FormItem({forAttribute, title, children, isRequired = true}) {
    return (
        <div className='form-item-container'>
            <label htmlFor={forAttribute} className={`form-item-label ${isRequired ? 'required' : null}`}>{title}</label>
            {children}
        </div>
    );
}

export default FormItem;