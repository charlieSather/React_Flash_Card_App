import React from 'react';

function CardForm(props) {
    if(props.stacks){
        return (
            <form className='form' onSubmit={props.submit}>
                <div className="form-group">
                    <label className='control-label'>Word</label>
                    <input required type='text' className='form-control' name='Word'></input>
                </div>
                <div className="form-group">
                    <label className='control-label'>Definition</label>
                    <input required type='text' className='form-control' name='Definition'></input>
                </div>
                <div className='form-group'>
                    <label className='control-label'>Card Stack</label>
                    <select required className='form-control' name="StackId">
                        {/* <option selected='selected' disabled>Choose stack</option> */}
                        {props.stacks.map(x => <option key={x.id} value={x.id}>{x.title}</option>)}
                    </select>
                </div>
                <div className='form-group'>
                    <input className='btn btn-primary' type='submit' value='Add Card'></input>
                </div>
        
            </form>
            );
    } else{
        return<></>;
    }
   
  }

export default CardForm;