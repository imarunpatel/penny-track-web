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

            <div className="flex justify-center items-center font-bold text-neutral-400 min-h-40">
                Under Construction 🛠️ 
            </div>
        </main>
    </div>
  )
}

export default Todo