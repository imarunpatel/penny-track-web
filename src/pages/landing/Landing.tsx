import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import PersonImage from '../../assets/images/undraw_statistic_chart_re_w0pk.svg'

const Landing = () => {
  return (
    <main className="">
      <header className="px-4 md:px-14 flex items-center gap-2 h-11">
          <img src={Logo} alt="Logo" width={30} className="rounded" />
          <div>Penny Track</div>
      </header>
      <div className="px-4 md:px-14 py-16">
        <section className="flex flex-col items-center">
          <h1 className="text-3xl font-extrabold max-w-96 text-center">
            Manage Your Expenses With Ease
          </h1>
          <p className="max-w-2xl mt-10 text-center text-gray-500">
          Take control of your spending habits with our intuitive expense tracker. Simplify budgeting, track expenses effortlessly, and watch your savings grow. Whether you&apos;re managing daily expenses or planning for the future, our tool is designed to help you achieve your financial goals with confidence.  
          </p>
          <Link to="home">
            <button className="bg-red-500 px-8 py-3 rounded-full hover:bg-red-600 mt-10 mb-8 text-white">Get Started</button>
          </Link>
        </section>

        <section className="flex justify-center">
          <img src={PersonImage} alt="Person" />
        </section>
      </div>
      <footer className="px-4 md:px-14 h-11 flex items-center gap-3 text-sm">
          <a href="" className="text-blue-600 underline">Terms of use</a>
          <a href="" className="text-blue-600 underline">Privacy Policy</a>
      </footer>
    </main>
  )
}

export default Landing