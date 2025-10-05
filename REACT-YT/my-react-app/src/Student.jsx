//props = read - only properties that are shared btw components <Component key=value></>
import PropTypes from 'prop-types';

function Student(props){
    const style = {
        margin:"0",
    };
    const style1 = {
        border:"solid grey",
    };

    return(
        <div style={style1}>
            <p style={style}>Name: {props.name}</p>
            <p style={style}>Age: {props.age}</p>
            <p style={style}>IsStudent: {props.isStudent ? "Yes" : "No"}</p>
        </div>
    );
}
Student.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    isStudent: PropTypes.bool,
};

Student.defaultProps = {
    name:"Guest",
    age: 0 ,
    isStudent: false,
}

export default Student