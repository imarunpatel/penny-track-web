import { ListBulletIcon } from "@heroicons/react/24/outline"

const Todo = () => {
  return (
    <div className="max-w-lg mx-auto min-h-screen">
        <header className="flex px-3 py-3 gap-2 bg-violet-200 h-16 items-center">
            <ListBulletIcon width={20} />
            <div>Todos</div>
        </header>
        <main className="px-3 pt-3">
            <div className="flex justify-between mb-2">
                <div>Today's Task</div>
                <div><input type="date" /></div>
            </div>
            <div className="bg-gray-200 flex gap-2 items-center px-3 py-3 rounded-md mb-2">
                {/* <div className="left"> */}
                    <input type="checkbox"  className="text-lg w-4 h-4"  />
                {/* </div> */}
                <div className="right text-gray-700">
                    Comple the project for todo list slfjsd lksdjf lsf sdl fs
                </div>
            </div>

            <div className="bg-gray-200 flex gap-2 items-center px-3 py-3 rounded-md mb-2">
                {/* <div className="left"> */}
                    <input type="checkbox"  className="text-lg w-4 h-4"  />
                {/* </div> */}
                <div className="right text-gray-400 line-through">
                    Comple the project for todo list slfjsd lksdjf lsf sdl fs
                </div>
            </div>

        </main>
    </div>
  )
}

export default Todo