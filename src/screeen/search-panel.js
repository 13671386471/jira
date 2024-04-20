import { useState } from 'react';
export const SearchPanel = () => {
    const [param ,setParam] = useState({
        name: '',
        personId: ''
    })
    const [personOptions, setPersonOptions] = useState([]);


  return (
    <div>
        <form>
            <input
                type="text"
                className="form-control search-input"
                placeholder="type to search"
                value={param.name}
                onChange={(e) => {
                    setParam({
                        ...param,
                        name: e.target.value
                    })
                }}
            />
            <select value={param.personId} onChange={(e) => {
                setParam({
                    ...param,
                    personId: e.target.value
                })
            }}>
                <option value="">负责人</option>
                {
                    personOptions.map(person => {
                        return <option 
                                key={person.id} 
                                value={person.id}
                            >
                                {person.name}
                            </option>
                    })
                }
            </select>
        </form>
        
    </div>
    
  );
};