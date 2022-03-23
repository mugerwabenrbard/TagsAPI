import {useState, useEffect} from 'react'
import Axios from "axios"
import axios from 'axios'

var APIForm = ()=>{

    // Add tags input
    var [tags, setTags] = useState([])
    var [options, setOptions] = useState([])


    var addTags = event=>{
        if (event.key === "Enter" && event.target.value !=="") {
            setTags([...tags, event.target.value])
            event.target.value = ''
            setText('')
        }
    }

    var removeTags = indexToRemove => {
        setTags(tags.filter((_,index)=>index !== indexToRemove))
    }

    // Suggestions
    var [makeup, setMakeup] = useState([])
    var [hairstyle, setHairstyle] = useState([])
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
      var loadMakeup = async () => {
          var response =  await Axios.get('https://tagsug.herokuapp.com/makeup')
          setMakeup(response.data)
      }

      var loadHairstyle = async () => {
        var response =  await Axios.get('https://tagsug.herokuapp.com/hairstyle')
        setHairstyle(response.data)
    }

    loadHairstyle()
    loadMakeup()
    
    }, [])

    var onChangeHandler = (text) =>{

            var matches = []
            if (options === 'makeup') {
                if (text.length>0) {
                    matches = makeup.filter(mkup=>{
                        var regex = new RegExp(`${text}`,'gi')
                        return mkup.name.match(regex)
                    })
                }
                setSuggestions(matches)
                setText(text)
            }else if(options === 'hairstyle'){
                if (text.length>0) {
                    matches = hairstyle.filter(mkup=>{
                        var regex = new RegExp(`${text}`,'gi')
                        return mkup.name.match(regex)
                    })
                }
                setSuggestions(matches)
                setText(text)
            }else{
                setSuggestions([])
                setText(text)
            }
    }

    var onSuggestHandler = (text) =>{
        setTags([...tags,text])
        setText('')
        setSuggestions([])
    }

    var saveTags = ()=>{
        if (options === 'makeup') {
            var payload = {
                name: tags.name
            }
            axios.post('https://tagsug.herokuapp.com/addMakeup',payload)
            .then(()=>{alert('data added from axios')})
            .catch(()=>{})
            setTags([])
        }
    }
    
    return(
        <div>
            <label htmlFor="" className='mb-2'>Tags Type</label>  
            <select name="" id="" className='form-control' onChange={e => setOptions(e.target.value)}>
                <option value="">Select Type</option>
                <option value="hairstyle">Hairstyle</option>
                <option value="makeup">Makeup</option>
            </select>

            <label htmlFor="" className='mt-3'>Add Tags</label>  
            <div className='d-flex'>
            <div className="tags-input">
                <ul id='tags'>
                    {
                        tags.map((tag,index)=>
                        <li className="tag" key={index}>
                            <span className='tag-title'>{tag}</span>
                            <span className='tag-close-icon' onClick={()=>removeTags(index)}>x</span>
                        </li>
                        )
                    }
                </ul>
                <input type="text" placeholder="Press enter to add tags" value={text}  onChange={e =>onChangeHandler(e.target.value)} onKeyUp={addTags}/>
            </div>
            <button className='btn btn-primary m-2' onClick={saveTags}>Submit</button>
            </div>
            <form action="" method="post">

            </form>
            {suggestions && suggestions.map((suggestion,i)=>
                <div key={i} className='suggestions form-control' onClick={e =>onSuggestHandler(suggestion.name)}>{suggestion.name}</div>
            )}
           
            <div className='row mt-5'>
                <div className='col-6'>
                    <button className='bg-success text-light p-2 btn ' onClick={()=>window.location.replace("https://tagsug.herokuapp.com/hairstyle")}>Hairstyle Tags</button>
                </div>
                <div className='col-6'>
                <button className='bg-success text-light p-2 btn' onClick={()=>window.location.replace("https://tagsug.herokuapp.com/makeup")}>Makeup Tags</button>
                </div>
            </div>
        </div>
    )
}

export default APIForm