import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AddProject from './AddProject'

export class ProjectList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        this.getAllProjects()
    }

    getAllProjects() {
        axios.get("http://localhost:3000/api/projects/")
            .then(response => {
                this.setState({
                    projects: response.data
                })
            })
    }


    render() {

        const projects = this.state.projects.map(project => (
            <div key={project._id}>
                <h3><Link to={"/projects/" + project._id}>{project.title}</Link></h3>
                <p>{project.description}</p>
            </div>
        ))

        return (
            <div>
                <div style={{ width: '60%', float: "left" }}>
                    <h1>Projects List</h1>
                    {projects}
                </div>
                <div style={{ width: '40%', float: "right" }}>
                    <AddProject updateData={() => this.getAllProjects()} /> 
                </div>
            </div>
        )
    }
}

export default ProjectList
