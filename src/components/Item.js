import '../css/Item.css';
import ItemInfo from './ItemInfo';
import ListItem from '../models/ListItem';
import { GetGenderName } from '../services/General';

function Item({itemObject, editItemCallBack, removeItemCallBack}) {
    const listItems = [
        new ListItem(0, "Age", itemObject.age),
        new ListItem(1, "Breed", itemObject.breed),
        new ListItem(2, "Gender", GetGenderName(itemObject.gender)),
    ];
    return (
        <div className='item'>
            <div className='item-header'>
                <h2 className='item-title'>{itemObject.name}</h2>
                <div className='item-options'>
                    <div className='icon' onClick={() => editItemCallBack(itemObject)}>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </div>
                    <div className='icon' onClick={() => removeItemCallBack(itemObject.id)}>
                        <i className="fa-sharp fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
            <ul className='info-container'>
                { listItems.map((item) => (<li key={item.id}><ItemInfo title={item.title} value={item.value} /></li>)) }
            </ul>
        </div>
    );
}

export default Item;