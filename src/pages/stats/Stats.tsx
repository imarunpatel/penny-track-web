import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import useExpenseStore from "../../store/expenseStore";
import { daysInThisMonth, formateToYearMonth } from "../../utils/helpers/dateFormate";
import CategoryIcon from "../../assets/icons/categories.png";


const Stats = () => {
  const { stats } = useExpenseStore();

  const yearMonth = formateToYearMonth(new Date());
  const currentStats = stats?.get(yearMonth)?.stats
  const statsMap = new Map();

  let categoryExpense: {[key: string]: number}  = {};

  let today = new Date().toLocaleDateString('default', { month: 'long' });

  if(currentStats) {
    Object.keys(currentStats).forEach(item => {
      currentStats[item].forEach(expense => {
        let key = expense.category.id + '$' + expense.category.name
        categoryExpense[key] = (categoryExpense[key] || 0) + expense.expense
      })
      const value = currentStats[item].reduce((acc, curr) => acc + curr.expense, 0);
      statsMap.set(item.split('-')[2], value);
    })
  }


  const expenseData = Array.from({length: daysInThisMonth()}, (_, i) => {
    let index = String(i+1).padStart(2, '0');
    return (statsMap.get(index) || 0)
  })

  const totalExpense = expenseData.reduce((curr, acc) => acc + curr, 0).toFixed(2)

  const data: ChartData<'line'> = {
    labels: Array.from({length: 30}, (_, i) => i+1),
    datasets: [
      {
        label: "Amount",
        data: expenseData,
        fill: false,
        borderColor: "#5b21b6",
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    elements: {
      point: {
        radius: 1
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day of the month'
        },
        ticks: {
          minRotation: 0,
          maxRotation: 0,
        },
        border: {
          display: false,
        },
        grid: {
          display: false,
        }
      },
      y: {
        ticks: {
          display: false,
        },
        beginAtZero: false,
        border: {
          display: false,
        },
        grid: {
          display: false,
          
        }
      },
    },
  };

  return (
    <main className="page-container ">
      <div className="max-w-lg mx-auto min-h-screen">
        <div className="content">
          <div className="bg-violet-100 pt-4 relative rounded-bl-lg rounded-br-lg">
            <div className="px-3 flex justify-start gap-1 pb-2">
              <ChartBarIcon width={20} />
              <h1 className="text-xl textgray-500">Statistic</h1>
            </div>
            <div className="px-3  w-full flex justify-between items-center">
                <div className="text-2xl text-gray-500">₹{totalExpense}</div>
                <div className="text-gray-400">Total Expenses</div>
            </div>
            <Line data={data} options={options} />
          </div>
          <div className="px-3">
            <div className="mt-2">{today} Expenses</div>
            <div className="flex gap-2 flex-wrap">

            {
              Object.keys(categoryExpense).map(item => (
                <div key={item} className="p-2 bg-gray-100 flex rounded-md flex-1 min-w-40">
                  <div className="left px-2 text-4xl flex items-center">
                    <img src={CategoryIcon} alt="" className="w-10" />
                  </div>  
                  <div className="right flex-1 px-2 flex flex-col items-end">
                    <div>{item.split('$')[1]}</div>
                    <div className="text-sm text-gray-500">₹{categoryExpense[item]}</div>
                  </div>
                </div>
              ))
            }
              

              {/* <div className="p-2 bg-gray-100 flex rounded-md flex-1">
                <div className="left px-2 text-4xl flex items-center">
                  <div className="w-10 h-10 bg-red-200 rounded-full flex justify-center items-center text-lg text-gray-500">C</div>
                </div>
                <div className="right flex-1 px-2 flex flex-col items-end">
                  <div>Clothes</div>
                  <div className="text-sm text-gray-500">₹34398</div>
                </div>
              </div> */}


            </div>
          </div>
            {/* <HomeAnalytics /> */}
        </div>
      </div>
    </main>
  );
};

export default Stats;
