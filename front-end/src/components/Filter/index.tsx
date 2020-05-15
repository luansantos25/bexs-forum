import React, { useState, useEffect } from 'react'

import { FilterContainer } from './styles'

interface Props {
  handleSearchFilter: (filter: {
    textToSearch: string
    noAnswered: boolean
  }) => void
}

const Filter: React.FC<Props> = ({ handleSearchFilter }: Props) => {
  const [filter, setFilter] = useState({
    textToSearch: '',
    noAnswered: false,
  })

  useEffect(() => {
    handleSearchFilter(filter)
  }, [filter, handleSearchFilter])

  return (
    <FilterContainer>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setFilter({ ...filter, textToSearch: e.target.value })}
      />
      <label htmlFor="no-answered">
        <input
          id="no-answered"
          type="checkbox"
          onChange={(e) =>
            setFilter({ ...filter, noAnswered: e.target.checked })
          }
        />
        No Answered questions
      </label>
    </FilterContainer>
  )
}

export default Filter
