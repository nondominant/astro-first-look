 import {
   useQuery,
   useMutation,
   useQueryClient,
   QueryClient,
   QueryClientProvider,
 } from 'react-query'

const queryClient = new QueryClient()


const getData = async () => {
  const response = await fetch("http://192.168.1.252/server/active", {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'}
  }) 
  if(!response.ok) {
    throw new Error('Network response error');
  }
  return response.json()
}

export const JobsheetTable = () => {
  const queryClient = useQueryClient()
  const query = useQuery(['jobsheets'], getData)
  const mutation = useMutation(x => {
    return fetch("http://192.168.1.252/server/close", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({id: x.id})
    }).then(res => {
      //add classes for animation
    }).catch(() => {
      window.confirm("something went wrong");
    })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('jobsheets')
    },
  })
  const mutateOnClick = (currentid) => {
    mutation.mutate({id: currentid})
  }

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <div class="page">
    {query.data.map(x =>
      <div class="container">
        <div class="header">
        {mutation.isLoading ? ('Deleting...') : (
          <>
          {mutation.isError ? (<div>Error: {mutation.error.message}</div>) : null}
          {mutation.isSuccess ? (<div>COMPLETED!</div>) : null}

          <button onClick={() => {
            mutateOnClick(x.id)
          }}>DONE!</button>
          </>
        )}
        </div>
        <div class="sheet" id={x.id}>
          <div class="field"><h2>ID</h2><p>{x.id}</p></div>
          <div class="field"><h2>Job Description</h2><p>{x.quote}</p></div>           
          <div class="field"><h2>Engineer</h2><p>{x.author}</p></div>                 
          <div class="field"><h2>Date</h2><p>{x.year}</p></div>                       
          <div class="field"><h2>Start Time</h2><p>{x.startTime}</p></div>            
          <div class="field"><h2>End Time</h2><p>{x.endTime}</p></div>                
          <div class="field"><h2>Equipment</h2><p>{x.equipment}</p></div>             
          <div class="field"><h2>Parts Used</h2><p>{x.partsUsed}</p></div>            
          <div class="field"><h2>Materials Used</h2><p>{x.materialsUsed}</p></div>    
          <div class="field"><h2>Further Action Required</h2><p>{x.furtherAction}</p></div>
          <div class="field"><h2>Location</h2><p>{x.location}</p></div>               
          <div class="field"><h2>Amendments</h2><p>{x.updateList}</p></div> 
        </div>
      </div>
    )}
    </div>
    </QueryClientProvider>
    </>
  )
}

