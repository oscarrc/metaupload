import { create } from 'ipfs-core'
import { useEffect, useState } from 'react'

let ipfs = null

const useIPFS = () => {
  const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfs))
  const [ipfsInitError, setIpfsInitError] = useState(null)
  const options = {
    repo: 'metaupload',
    config: {
      Addresses: {
        Swarm: [
          '/dns4/metaupload-webrtc-star.herokuapp.com/tcp/443/wss/p2p-webrtc-star/'
        ]
      }
    }
  }

  useEffect(() => {
    startIpfs()
    // return function cleanup () {
    //   if (ipfs && ipfs.stop) {
    //     console.log('Stopping IPFS')
    //     ipfs.stop().catch(err => console.error(err))
    //     ipfs = null
    //     setIpfsReady(false)
    //   }
    // }
  })

const startIpfs = async () => {
    if (ipfs) {
      console.log('IPFS already started')
    } else if (window.ipfs && window.ipfs.enable) {
      console.log('Found window.ipfs')
      ipfs = await window.ipfs.enable({ commands: ['id'] })
    } else {
      try {
        console.time('IPFS Started')
        ipfs = await create(options)
        console.timeEnd('IPFS Started')
      } catch (error) {
        console.error('IPFS init error:', error)
        ipfs = null
        setIpfsInitError(error)
      }
    }

    setIpfsReady(Boolean(ipfs))
  }

  return { ipfs, isIpfsReady, ipfsInitError }
}



export { useIPFS };