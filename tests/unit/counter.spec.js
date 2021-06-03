import {render, fireEvent, waitFor, screen} from '@testing-library/vue'
import axios from 'axios'
import AsyncComponent from '@/components/AsyncComponent.vue'

jest.mock('axios')

describe('AsyncComponent.vue 2', () => {
  const count = 53
  beforeAll(() => {
    axios.get.mockResolvedValue({count})
  })
  it('mouted', async () => {
    render(AsyncComponent)
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1))
    await screen.findByText(`count:${count}`)
  })
})
