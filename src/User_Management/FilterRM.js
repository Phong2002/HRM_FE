function FilterRM(props){
    return <>
    <div>
    <label htmlFor="gender" className="label-profile">Giới tính </label>
    <select onChange={(e)=>props.setFilterGender(e.target.value)} value={props.gender} className="input-profile">
        <option value="">Tất cả</option>
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
        <option value="Khác">Khác</option>
    </select>
    </div>
    <div className="filter_rm">
    <label htmlFor="birthday" className="label-profile">Ngày sinh </label>
    <div className="input-profile">
     Bắt đầu từ <input type="date" onChange={(e)=>props.setStartBirthday(e.target.value)} value={props.startBirthday}/>
     đến <input type="date" onChange={(e)=>props.setEndBirthday(e.target.value)} value={props.endBirthday}/>
    </div>
    
    </div>

    <div className="filter_rm">
    <label htmlFor="workStart" className="label-profile">Ngày bắt đầu làm việc</label>
    <div className="input-profile">
     Bắt đầu từ <input type="date" onChange={(e)=>props.setStartWorkTime(e.target.value)} value={props.startWorkTime} />
     đến <input type="date"  onChange={(e)=>props.setEndWorkTime(e.target.value)} value={props.endWorkTime} />
    </div>
    </div>
    </>
}

export default FilterRM;