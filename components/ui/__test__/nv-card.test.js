import { mount } from '@vue/test-utils';
import NvCard from '../NvCard.vue';
import { describe, expect, test } from 'vitest';

describe('NvCard component', () => {
    test('renders correctly', () => {
        const wrapper = mount(NvCard, {
            props: {
                price: 100,
                title: 'test card',
                src: 'https://test-vitest.vitest',
                rating: 4.5,
                description: 'test description',
                id: 5
            }
        })

        expect(wrapper.html()).matchSnapshot()
    })
})