import { useEffect, useState } from 'react';
export const SearchPanel = ({param, setParam, users}) => {
    
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
                    users.map(person => {
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