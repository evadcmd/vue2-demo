import axios from 'axios'
import {mount} from '@vue/test-utils'
import flushPromises from 'flush-promises'
import AsyncComponent from '@/components/AsyncComponent.vue'

jest.mock('axios')

describe('AsyncComponent.vue', () => {
  const count = 52
  beforeAll(async () => {
    axios.get.mockResolvedValue({count})
  })
  it('a test sample of async component', async () => {
    const wrapper = mount(AsyncComponent)
    await flushPromises()
    expect(wrapper.vm.count).toBe(count)
  })
  it('button click should increment the count', async () => {
    const wrapper = mount(AsyncComponent)
    await flushPromises()
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.vm.count).toBe(count + 1)
  })
})
