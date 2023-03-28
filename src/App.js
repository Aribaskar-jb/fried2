import React, { useState } from "react";
import { ReactDOM } from "react";
import Grid from '@mui/material/Grid';
import "./App.css"

function Card(props) {
  return <div className="card" >{props.children}</div>;
}

function SelectableCard(props) {
  const [isSelected, setIsSelected] = useState(props.selected ? "selected" : "");
  const className = "selectable " + isSelected;

  const handleClick = () => {
    setIsSelected(isSelected ? "" : "selected");
    props.onClick();
  };

  return (
    <Card >
      <div className={className} onClick={handleClick} >
        {props.children}
        <div className="check">
          <span className="checkmark">✔</span>
        </div>
      </div>
    </Card>
  );
}

function SelectableTitleCard(props) {
  const { title, description, selected } = props;
  return (

    <SelectableCard onClick={props.onClick} selected={selected} >
      <div className="content">
        <h1 className="title">{title}</h1>
        <p className="description">{description}</p>
      </div>

    </SelectableCard>
  );
}

function SelectableCardList(props) {
  const [selected, setSelected] = useState(
    props.multiple ? [] : -1
  );

  const onItemSelected = (index) => {
    if (props.multiple) {
      const selectedIndexes = [...selected];
      const selectedIndex = selectedIndexes.indexOf(index);
      if (selectedIndex > -1) {
        selectedIndexes.splice(selectedIndex, 1);
        props.onChange(selectedIndexes);
      } else {
        if (!(selectedIndexes.length >= props.maxSelectable)) {
          selectedIndexes.push(index);
          props.onChange(selectedIndexes);
        }
      }
      setSelected(selectedIndexes);
    } else {
      props.onChange(index);
      setSelected(index);
    }
  };

  const content = props.contents.map((cardContent, i) => {
    const { title, description } = cardContent;
    const isSelected = props.multiple
      ? selected.indexOf(i) > -1
      : selected === i;
    return (

      <SelectableTitleCard
        key={i}
        // title={title}
        // description={description}
        title={description}
        description={title}
        selected={isSelected}
        onClick={() => onItemSelected(i)}
      />

    );
  });

  return <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className="cardlist" style={{justifyContent:"center"}}>{content}</Grid>;
}
const teams = [
  {
    title: "Bengali",
    description: "বাংলা"
  },
  {
    title: "Gujarati",
    description: "ગુજરાતી"
  },
  {
    title: "Hyderabadi",
    description: "హైదరాబాదీ"
  },
  {
    title: "Keralite",
    description: "കേരളം"
  },
  {
    title: "Punjabi",
    description: "ਪੰਜਾਬੀ"
  },
  {
    title: "Tamilian",
    description: "தமிழன்"
  }
];

function Example(props) {
  const [selected, setSelected] = useState();

  const onListChanged = (selected) => {
    setSelected(selected);
  };

  const handleSubmit = (e) => {
    // window.alert("Selected: " + selected);
    // console.log(e.value)
    window.alert(teams[selected].title);  
  };

  return (
    <div >
      <h1 className="title">{props.title}</h1>
      <SelectableCardList
        multiple={props.multiple}
        maxSelectable={props.maxSelectable}
        contents={props.cardContents}
        onChange={onListChanged}
      />
      <button className="card" onClick={handleSubmit}>
        Get selected
      </button>
    </div>
  );
}

function App() {
  
  const genres = [
    {
      title: "Google",
      description: "Mountain View, CA"
    },
    {
      title: "Apple",
      description: "Cupertino, CA"
    },
    {
      title: "Microsoft",
      description: "Redmond, WA"
    },
    {
      title: "Facebook",
      description: "Menlo Park, CA"
    }
    
  ];

  return (
    <div className="data">
      <Example title="Pick a team" cardContents={teams} />
    </div>
  );
}

export default App;
