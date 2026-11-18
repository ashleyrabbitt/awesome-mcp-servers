// Register once so native navigation and client-side routes use the same controls.
if (!customElements.get('workflow-finder')) {
  customElements.define('workflow-finder', class extends HTMLElement {
    connectedCallback() {
      if (this.controller) return;
      this.controller = new AbortController();
      const options = { signal: this.controller.signal };
      const select = this.querySelector('[data-wl-type]');
      const search = this.querySelector('[data-wl-query]');
      const count = this.querySelector('[data-wl-count]');
      const cards = Array.from(this.querySelectorAll('[data-wl-kind]'));
      const entries = cards.map(card => ({ card, text: card.textContent.toLowerCase() }));
      if (!search) return;

      const filter = () => {
        const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
        let total = 0;
        for (const { card, text } of entries) {
          card.hidden = !!(select?.value && card.dataset.wlKind !== select.value) || !words.every(word => text.includes(word));
          if (!card.hidden) total++;
        }
        count.textContent = total + (total === 1 ? ' resource' : ' resources');
        this.querySelector('[data-wl-empty]').hidden = total > 0;
      };
      const readFilters = () => {
        const params = new URLSearchParams(location.search);
        search.value = params.get('q') || '';
        if (select) {
          const type = params.get('type');
          select.value = Array.from(select.options).some(option => option.value === type) ? type : '';
        }
        filter();
      };
      const updateFilters = () => {
        const url = new URL(location.href);
        if (search.value.trim()) url.searchParams.set('q', search.value.trim());
        else url.searchParams.delete('q');
        if (select?.value) url.searchParams.set('type', select.value);
        else url.searchParams.delete('type');
        history.replaceState(history.state, '', url);
        filter();
      };
      const reveal = () => {
        const card = cards.find(item => '#' + item.id === location.hash);
        if (!card) return;
        if (card.hidden) {
          search.value = '';
          if (select) select.value = '';
          updateFilters();
        }
        card.querySelector('details').open = true;
      };
      this.querySelector('[data-wl-controls]').hidden = false;
      search.addEventListener('input', updateFilters, options);
      select?.addEventListener('change', updateFilters, options);
      this.querySelector('[data-wl-reset]').addEventListener('click', () => {
        search.value = '';
        if (select) select.value = '';
        updateFilters();
        search.focus();
      }, options);
      for (const button of this.querySelectorAll('[data-wl-copy]')) {
        button.hidden = false;
        button.addEventListener('click', async () => {
          const example = button.parentElement.querySelector('[data-wl-prompt]');
          try {
            await navigator.clipboard.writeText(example.textContent);
            button.textContent = 'Copied';
          } catch {
            const range = document.createRange();
            range.selectNodeContents(example);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            button.textContent = 'Example selected · use Copy';
          }
        }, options);
      }
      window.addEventListener('hashchange', reveal, options);
      // The same fragment can be selected after someone manually closes its guide.
      this.addEventListener('click', event => {
        const link = event.target.closest('a[href^="#"]');
        if (link && link.hash === location.hash) reveal();
      }, options);
      window.addEventListener('popstate', readFilters, options);
      readFilters();
      reveal();
    }
    disconnectedCallback() {
      this.controller?.abort();
      this.controller = null;
    }
  });
}
