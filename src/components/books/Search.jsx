import React, { useRef } from "react"; 

const Search = ({filterText, onFilterTextChange}) => {
    const inputRef = useRef();

    /*  <Search filterText={filterName}
    onFilterTextChange={handleChangeFilterBooksByName}/> */
    const handleFilterTextChange = (e) => {
        onFilterTextChange(e.target.value);  //from parent Component
    }

    return ( 
        <div className="col-sm-12  pb-5">
           {/* <form className="mb-3 mt-3"> */}
            <label>Tìm theo tên sản phẩm: {"   "}
                <input type="text" placeholder="Search..." className="form-control" 
                    value={filterText}                
                    onChange={handleFilterTextChange}
                    ref={inputRef} /> 
            </label>
            {/* </form> */}
        </div>

    );

}

export default Search;