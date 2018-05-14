import React from "react";
import Radium from "radium";
import ListItem from "./ListItem";

const List = props => {
    const style = {
        ':hover': {
            background: "green"
        },

        width: "300px",
        margin: "0 auto"

    }
    const places = props
        .places
        .map(place => <ListItem
            style={style}
            onClick={(event) => console.log(event.target.getAttribute("value"))}
            value={place.name}
            key={place.id}>
            {place.name}
            - Rating: {place.rating}
        </ListItem>)
    return (
        <ul>
            {places}
        </ul>
    )
}

export default Radium(List);
