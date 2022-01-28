import { useState, useEffect } from 'react';
import Header from './components/Header'
import Filter from './components/Filter';
import Modal from './components/Modal'
import ListSpends from './components/ListSpends';
import { generateId } from './helpers'
import IconNewSpend from './img/nuevo-gasto.svg'

function App() {
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  )
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)

  const [spends, setSpends] = useState(
    JSON.parse(localStorage.getItem('spends')) ?? []
  )

  const [editSpend, setEditSpend] = useState({})

  const [filter, setFilter] = useState('')
  const [spendsFilter, setSpendsFilter] = useState([])

  useEffect(() => {
    if (Object.keys(editSpend).length > 0) {
      setModal(true)
      setTimeout(() => {
        setAnimateModal(true)
      }, 500)
    }
  }, [editSpend])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect(() => {
    localStorage.setItem('spends', JSON.stringify(spends) ?? [])
  }, [spends])

  useEffect(() => {
    if(filter) {
      const spendsFiltered = spends.filter( spendState => spendState.category === filter)
      setSpendsFilter(spendsFiltered)
    } else {
      setSpendsFilter([])
    }
  }, [filter, spends])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0

    if (budgetLS > 0) {
      setIsValidBudget(true)
    }

    const spendsLS = JSON.parse(localStorage.getItem('spends')) ?? []

    if (spendsLS > 0) {
      setSpends(spendsLS)
    }
  }, [])

  const handleNewSpend = () => {
    setModal(true)
    setEditSpend({})
    setTimeout(() => {
      setAnimateModal(true)
    }, 500)
  }

  const saveSpend = spend => {
    if (spend.id) {
      const spendsUpdated = spends.map(spendState => spendState.id == spend.id ? spend : spendState)
      setSpends(spendsUpdated)
      setEditSpend({})
    } else {
      spend.id = generateId()
      spend.date = Date.now()
      setSpends([...spends, spend])
    }
    setAnimateModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const deleteSpend = id => {
    const spendsUpdated = spends.filter(spendState => spendState.id !== id)
    setSpends(spendsUpdated);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        spends={spends}
        setSpends={setSpends}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />

      {isValidBudget && (
        <>
          <main>
            <Filter 
              filter={filter}
              setFilter={setFilter}
            />
            <ListSpends
              spends={spends}
              setEditSpend={setEditSpend}
              deleteSpend={deleteSpend}
              filter={filter}
              spendsFilter={spendsFilter}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconNewSpend}
              alt="Icono nuevo gasto"
              onClick={handleNewSpend}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveSpend={saveSpend}
          editSpend={editSpend}
          setEditSpend={setEditSpend}
        />
      )}

    </div>
  )
}

export default App
