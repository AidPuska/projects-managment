const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

const ProjectFilter = ({ filter, handleFilter }) => {


    const handleClick = (newFilter) => {
        console.log(newFilter)
        handleFilter(newFilter)
    }

    return (
        <div className="my-7 w-full mx-auto">
            <nav className="flex p-2.5 bg-white rounded">
                <p className="mr-2.5 font-semibold">Filter by:</p>
                {filterList.map(f => (
                    <button className={filter === f ? 'mr-2 border-r border-gray-30 pr-2 text-purple-700 font-medium last:border-none' : 'mr-2 border-r border-gray-300 pr-2 last:border-none'} onClick={() => handleClick(f)} key={f}>{f}</button>
                ))}
            </nav>
        </div>
    )
}

export default ProjectFilter