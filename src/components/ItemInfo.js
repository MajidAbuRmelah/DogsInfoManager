import '../css/ItemInfo.css';

function ItemInfo({title, value}) {
    return (
        <div>
            <span className='item-info-title'>{title}:</span>&nbsp;
            <span>{value}</span>
        </div>
    );
}

export default ItemInfo;