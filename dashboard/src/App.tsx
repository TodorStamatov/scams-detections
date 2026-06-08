import { AnalysisSection } from './components/analysis/AnalysisSection'
import { DatasetSection } from './components/dataset/DatasetSection'
import { AppFooter } from './components/layout/AppFooter'
import { AppHeader } from './components/layout/AppHeader'
import { SampleBanner } from './components/layout/SampleBanner'
import { ViewLoadingOverlay } from './components/view/ViewLoadingOverlay'
import { ViewPanel } from './components/view/ViewPanel'
import { VIEW_LABELS } from './components/view/types'
import { useDashboardData, useViewSwitch } from './hooks/useDashboard'
import {
  CenteredScreen,
  ContentWrap,
  ErrorText,
  Main,
  PageShell,
} from './styles/primitives'

const App = () => {
  const { error, paysim, ml, loading } = useDashboardData();
  const { activeView, switchTarget, viewSwitching, handleViewChange, displayView } =
    useViewSwitch();

  if (loading) {
    return <CenteredScreen>Зареждане…</CenteredScreen>
  }

  if (error || !paysim) {
    return (
      <CenteredScreen $padded>
        <ErrorText>{error ?? 'Няма данни'}</ErrorText>
      </CenteredScreen>
    )
  }

  const paysimSample = Boolean(paysim.meta.is_sample)

  return (
    <PageShell>
      <AppHeader
        activeView={displayView}
        viewSwitching={viewSwitching}
        onViewChange={handleViewChange}
      />

      <Main>
        {viewSwitching && (
          <ViewLoadingOverlay label={`Зареждане: ${VIEW_LABELS[switchTarget ?? activeView]}…`} />
        )}

        <ContentWrap $hidden={viewSwitching} aria-hidden={viewSwitching}>
          {paysimSample && <SampleBanner />}

          <ViewPanel active={activeView === 'dataset'}>
            <DatasetSection paysim={paysim} />
          </ViewPanel>

          <ViewPanel active={activeView === 'analysis'}>
            <AnalysisSection ml={ml} />
          </ViewPanel>

          <AppFooter />
        </ContentWrap>
      </Main>
    </PageShell>
  )
}

export default App;