import React, { useEffect, useState } from "react";
import { Form, InputGroup, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button'


class Filter {
  constructor(key, func, args) {
    this.key = key;
    this.func = func;
    this.args = args;
  }

  callback (item) {
    if (this.args) {
      return this.func(item, this.args);
    }
    return this.func(item);
  }
}


const FilterPanel = (props) => {
	const { addToFilterList, removeFromFilterList } = props;
  const [showAllScores, setShowAllScores] = useState(false);
  const [filterTitle, setFilterTitle] = useState("");

  let perfectScoreFilter = new Filter("PerfectScore", (game) => (game.a_count - game.a_done !== 0));
  let titleContainsFilter = new Filter("TitleContains", (game, args) => (game.title.toUpperCase().includes(args[0])));

  useEffect(() => {
    if (showAllScores) {
      addToFilterList(perfectScoreFilter);
    } else {
      removeFromFilterList(perfectScoreFilter);
    }
  }, [showAllScores]);

  const showAllClick = (event) => {
    setShowAllScores(!showAllScores);
  }  

  const applyTitleFilter = (event) => {
    if (event.key === "Enter") {
      if (filterTitle === "") {
        clearTitleFilter();
        return;
      }
      titleContainsFilter.args = [filterTitle.toUpperCase()];
      addToFilterList(titleContainsFilter);
    }
  };

  const clearTitleFilter = () => {
    setFilterTitle("");
    removeFromFilterList(titleContainsFilter);
  }

  const typeTitle = (event) => {
    let title = event.target.value;
    setFilterTitle(title);
  }

  return(
    <>
      <Form>
        <Form.Check type="checkbox" onClick={showAllClick} label="Показать 100% игры" checked={showAllScores}/>
      </Form>
      <Row>
        <Col xs={3}>
          <InputGroup className="mb-3">
            <Form.Control id='title' value={filterTitle} onChange={typeTitle} onKeyDown={applyTitleFilter}/>
            <Button variant="outline-light" onClick={clearTitleFilter}>Clear</Button>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
};

export default FilterPanel;